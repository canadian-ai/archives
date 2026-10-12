# Canadian AI Archives

**A window into the early history of artificial intelligence in Canada.**

[Explore the archive](https://archives.canadian-ai.ca) · [Read the first issue](https://archives.canadian-ai.ca/viewer/vol-1) · [Prediction timeline](https://archives.canadian-ai.ca/timeline) · [Public API](https://archives.canadian-ai.ca/api)

Canadian AI Archives is an independent reading experience built by [Canadian AI Solutions](https://www.canadian-ai.ca). It makes it easier to discover and read a selection of *Canadian Artificial Intelligence / Intelligence artificielle au Canada*, a historical magazine from Canada's AI research community.

The reader currently indexes **29 issues, from September 1984 to Summer 1992**. These are links to original PDFs hosted by the [Canadian Artificial Intelligence Association (CAIAC)](https://www.caiac.ca/en/canadian-ai-magazine), **not** a complete reproduction of CAIAC's collection, which extends through 2001.

> **About the source:** This is an independent Canadian AI Solutions project, not an official CAIAC publication or an affiliated archive. The original PDFs and their copyright remain with their respective rights holders. For the authoritative collection, visit [CAIAC's official magazine archive](https://www.caiac.ca/en/canadian-ai-magazine).

## Explore

| Experience | What you can do |
| --- | --- |
| [Issue browser](https://archives.canadian-ai.ca/#archives) | Browse the indexed magazine covers and filter issues by year. |
| [PDF reader](https://archives.canadian-ai.ca/viewer/vol-1) | Read individual issues with page navigation, zoom, and thumbnail controls. |
| [Prediction timeline](https://archives.canadian-ai.ca/timeline) | Explore an editorial comparison of earlier AI expectations with later developments. Filter by year, topic, or outcome. |
| [JSON API](https://archives.canadian-ai.ca/api) | Get machine-readable metadata and direct links to the CAIAC-hosted source PDFs. |

### How to use the reader

1. Open [archives.canadian-ai.ca](https://archives.canadian-ai.ca).
2. Choose **All years** or filter by year to find an issue.
3. Select a cover to open the PDF reader. You can navigate pages, change the zoom, or open the thumbnail view.
4. Follow the **CAIAC official archive** link to explore the complete original collection.

The reader may take a moment to load or generate a cover for an issue for the first time. It uses PDF.js for rendering, with caching to make repeat visits faster.

## Run locally

This project uses **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **pnpm**.

You'll need a Node.js version supported by Next.js 16 and pnpm (Corepack is one way to enable it).

```bash
git clone https://github.com/canadian-ai/archives.git
cd archives

corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other available commands:

```bash
pnpm build   # Create a production build
pnpm start   # Serve the production build
pnpm lint    # Run the configured lint command
```

**Optional: cover-image storage.** The app can check and upload generated covers to Vercel Blob. To use that integration locally, configure a Vercel Blob store and make `BLOB_READ_WRITE_TOKEN` available in `.env.local`. Without it, cloud cover lookup/upload can fail; the reader can still generate covers in the browser and cache them locally.

Historical PDFs are served from CAIAC URLs through the app's PDF proxy. A network connection is needed to load them.

## Public API

`GET https://archives.canadian-ai.ca/api` returns the indexed issues and their original PDF links as JSON. For example:

```bash
curl -H "Accept: application/json" https://archives.canadian-ai.ca/api
```

The response includes `name`, `description`, `source`, `endpoint`, `count`, and a `raw_urls` array. Each issue in `raw_urls` has an `id`, `title`, `volume`, `date`, `year`, and source PDF `url`.

The endpoint presents a human-readable page when requested by a browser with an HTML `Accept` header.

## Repository guide

| Location | Purpose |
| --- | --- |
| `app/page.tsx` | Homepage and historical introduction |
| `components/magazine-grid.tsx` | Year filters and issue browser |
| `app/viewer/[id]/` | Individual magazine reading pages |
| `components/pdf-viewer.tsx` | In-browser PDF rendering and reader controls |
| `app/timeline/` | Prediction timeline interface |
| `app/api/route.ts` | Public issue metadata API |
| `app/api/pdf-proxy/` | Proxy for source PDFs |
| `lib/magazine-data.ts` | Indexed magazine metadata and source links |
| `lib/timeline-data.ts` | Timeline entries and editorial assessments |

### Contributing or updating an issue

The issue catalogue is maintained in [`lib/magazine-data.ts`](lib/magazine-data.ts). When proposing an addition or correction:

1. Check the volume, date, and PDF URL against [CAIAC's official archive](https://www.caiac.ca/en/canadian-ai-magazine).
2. Update the relevant metadata without replacing the original source attribution.
3. Check that the issue opens in the reader and that its direct PDF URL is valid.
4. Open a pull request describing the change and linking to the source.

Timeline entries live in [`lib/timeline-data.ts`](lib/timeline-data.ts). They are **editorial interpretations**, not an authoritative transcription of historical predictions. Please include verifiable primary references when correcting or adding claims, and avoid presenting summaries as direct historical quotations.

## Why this exists

Canadian AI's history reaches much further back than today's wave of generative AI. These issues provide a glimpse of the people, research questions, and institutions that helped shape the field in Canada.

The aim here is simple: **make that history easier to discover while sending readers back to the original source.**

[Read why Canadian AI built this project](https://www.canadian-ai.ca/blog/why-canadian-ai-built-archives) · [Visit Canadian AI Solutions](https://www.canadian-ai.ca) · [Visit the official CAIAC archive](https://www.caiac.ca/en/canadian-ai-magazine)

---

*Canadian AI Archives is an independent historical reader by Canadian AI Solutions Inc. It is not affiliated with, endorsed by, or a successor to CAIAC. All historical magazine PDFs remain hosted by CAIAC and subject to the original rights and terms.*
