# CSI CVRCE Website

The official website for the Computer Society of India (CSI) student chapter at CVR College of Engineering. The site highlights the chapter's mission, events, gallery, team, and membership information.

## Built With

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- Static assets served from `public/`

## Requirements

- Node.js 22.12 or newer
- npm

## Getting Started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

The development site is available at `http://localhost:4321`.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production site in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Display Astro CLI help |

## Site Pages

Pages live in `src/pages/` and map directly to routes:

| File | Route | Purpose |
| --- | --- | --- |
| `index.astro` | `/` | Homepage and chapter overview |
| `aboutus.astro` | `/aboutus` | Chapter background and mission |
| `events.astro` | `/events` | Technical events and activities |
| `gallery.astro` | `/gallery` | Chapter image gallery |
| `team.astro` | `/team` | Faculty, student, executive, and advisory teams |
| `join-us.astro` | `/join-us` | Membership call to action and registration form |

The homepage includes a `/blog` link. Add `src/pages/blog.astro` when the blog page is ready.

## Project Structure

```text
src/
	pages/       Astro pages and routes
	styles/      Shared site styles
public/
	images/      Logos, team photos, and gallery images
dist/          Generated static output after npm run build
```

## Updating Content

- Update page text and page-specific data in the relevant file under `src/pages/`.
- Add gallery images to `public/images/gallery/` and register them in `src/pages/gallery.astro`.
- Add team images to `public/images/team/` and update the team data in `src/pages/team.astro`.
- Shared visual styles are defined in `src/styles/global.css`.

## Production Build

Run the build before publishing:

```bash
npm run build
```

The generated static site is written to `dist/` and can be deployed to any static hosting provider.

## Automatic Notion Publishing

The Blog page reads published posts from Notion at runtime and caches the response for 60 seconds. New published posts normally appear within about one minute without a Vercel redeployment.

To configure the Notion connection:

1. In Vercel, open the project and go to `Settings > Deploy Hooks`.
2. Create a hook named `Notion Blog Update`, select the production branch (`main`), and copy the generated URL.
3. In Notion, open the `CSI CVRCE Blog` database and create an automation for a page being added or updated.
4. Add a `Send webhook` action and paste the Vercel Deploy Hook URL. If Notion does not provide webhook actions on your plan, use Make or Zapier to watch the database and send a `POST` request to the Vercel URL.
5. Test the hook from PowerShell:

```powershell
Invoke-WebRequest -Method POST -Uri "PASTE_VERCEL_DEPLOY_HOOK_URL_HERE"
```

6. In Vercel, add `NOTION_TOKEN` and `NOTION_DATABASE_ID` under `Settings > Environment Variables` for the `Production` environment.
7. Keep new posts as `Draft` while editing and change `Status` to `Published` only when ready.

The Vercel Deploy Hook is optional for the runtime Blog setup. It can still be used when you want to rebuild the whole site after a content change, but normal Blog updates no longer require it.

Never commit `.env` or paste `NOTION_TOKEN` into GitHub, Vercel logs, or chat. Rotate the token immediately if it has been exposed.

## Links

- GitHub: https://github.com/csi-cvrce
- Instagram: https://www.instagram.com/csi_cvr/
- LinkedIn: https://www.linkedin.com/company/csi-cvrce/
- Astro documentation: https://docs.astro.build/
