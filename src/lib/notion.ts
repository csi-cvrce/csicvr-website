import { Client } from "@notionhq/client";

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image?: string;
  featured: boolean;
  content: string;
}

const token = import.meta.env.NOTION_TOKEN;
const databaseId = import.meta.env.NOTION_DATABASE_ID;

function text(property: any, fallback = "") {
  if (property?.title) return property.title.map((item: any) => item.plain_text).join("");
  if (property?.rich_text) return property.rich_text.map((item: any) => item.plain_text).join("");
  return fallback;
}

function richTextToHtml(items: any[] = []) {
  return items.map((item) => {
    let value = escapeHtml(item.plain_text ?? "");
    const annotations = item.annotations ?? {};

    if (annotations.code) value = `<code>${value}</code>`;
    if (annotations.bold) value = `<strong>${value}</strong>`;
    if (annotations.italic) value = `<em>${value}</em>`;
    if (annotations.underline) value = `<u>${value}</u>`;
    if (annotations.strikethrough) value = `<s>${value}</s>`;
    if (item.href) value = `<a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">${value}</a>`;

    return value;
  }).join("");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

function blocksToHtml(blocks: any[]) {
  const output: string[] = [];
  let listType = "";

  const closeList = () => {
    if (listType) output.push(`</${listType}>`);
    listType = "";
  };

  for (const block of blocks) {
    const data = block[block.type];
    const content = richTextToHtml(data?.rich_text);
    const nextListType = block.type === "bulleted_list_item" ? "ul" : block.type === "numbered_list_item" ? "ol" : "";

    if (nextListType) {
      if (listType !== nextListType) {
        closeList();
        output.push(`<${nextListType}>`);
        listType = nextListType;
      }
      output.push(`<li>${content}</li>`);
      continue;
    }

    closeList();
    if (block.type === "paragraph" && content) output.push(`<p>${content}</p>`);
    if (block.type === "heading_1") output.push(`<h2>${content}</h2>`);
    if (block.type === "heading_2") output.push(`<h3>${content}</h3>`);
    if (block.type === "heading_3") output.push(`<h4>${content}</h4>`);
    if (block.type === "quote") output.push(`<blockquote>${content}</blockquote>`);
    if (block.type === "code") output.push(`<pre><code>${content}</code></pre>`);
    if (block.type === "divider") output.push("<hr />");
    if (block.type === "image") {
      const source = data.type === "external" ? data.external?.url : data.file?.url;
      if (source) output.push(`<img src="${escapeHtml(source)}" alt="" loading="lazy" />`);
    }
  }

  closeList();
  return output.join("");
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!token || !databaseId) return [];

  const notion = new Client({ auth: token });
  const response = await notion.dataSources.query({
    data_source_id: databaseId,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
    sorts: [{ property: "Publish Date", direction: "descending" }],
  });

  const posts: BlogPost[] = [];

  for (const page of response.results) {
    if (!("properties" in page)) continue;

    const properties = page.properties as Record<string, any>;

    const title = text(properties.Title, "Untitled");
    const slug = text(properties.Slug) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const excerpt = text(properties.Excerpt);

    const category =
      properties.Category?.select?.name ?? "General";

    const author =
      text(properties.Author, "CSI CVRCE");

    const date =
      properties["Publish Date"]?.date?.start ?? "";

    const image =
      properties["Cover Image URL"]?.url ?? undefined;

    const featured =
      properties.Featured?.checkbox ?? false;

    posts.push({
      id: page.id,
      title,
      slug,
      excerpt,
      category,
      author,
      date,
      image,
      featured,
      content: blocksToHtml((await notion.blocks.children.list({ block_id: page.id })).results),
    });
  }

  return posts;
}