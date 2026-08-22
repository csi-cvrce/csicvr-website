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

## Links

- GitHub: https://github.com/csi-cvrce
- Instagram: https://www.instagram.com/csi_cvr/
- LinkedIn: https://www.linkedin.com/company/csi-cvrce/
- Astro documentation: https://docs.astro.build/
