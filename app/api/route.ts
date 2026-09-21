import { NextRequest, NextResponse } from "next/server";
import { magazines } from "@/lib/magazine-data";

const endpoint = "https://archives.canadian-ai.ca/api";

function getPayload() {
  return {
    name: "Canadian AI Archives",
    description: "Selected Canadian Artificial Intelligence magazine issues indexed by Canadian AI Solutions.",
    source: "https://www.caiac.ca/en/canadian-ai-magazine",
    endpoint,
    count: magazines.length,
    raw_urls: magazines.map(({ id, title, volume, date, year, pdfUrl }) => ({
      id,
      title,
      volume,
      date,
      year,
      url: pdfUrl,
    })),
  };
}

function renderPage() {
  const payload = JSON.stringify(getPayload(), null, 2);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Archives API | Canadian AI Solutions</title>
    <style>
      :root { color-scheme: light; --ink: #171918; --muted: #68716d; --line: #d9dedb; --paper: #fafafa; --green: #16835f; }
      * { box-sizing: border-box; }
      body { margin: 0; background: var(--paper); color: var(--ink); font-family: Inter, ui-sans-serif, system-ui, sans-serif; line-height: 1.6; }
      main { width: min(960px, calc(100% - 40px)); margin: 0 auto; padding: 72px 0 96px; }
      .eyebrow { color: var(--green); font-size: 11px; font-weight: 800; letter-spacing: .22em; text-transform: uppercase; }
      h1 { margin: 16px 0 12px; font-family: Georgia, serif; font-size: clamp(42px, 7vw, 76px); font-weight: 500; letter-spacing: -.055em; line-height: 1; }
      .intro { max-width: 620px; color: var(--muted); font-size: 17px; }
      .meta { display: flex; flex-wrap: wrap; gap: 10px 28px; margin: 32px 0 48px; color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
      .meta strong { color: var(--ink); font-weight: 600; }
      .panel { overflow: hidden; border: 1px solid var(--line); background: #fff; }
      .panel-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 1px solid var(--line); padding: 16px 20px; }
      .panel-head span { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
      .status { color: var(--green); font-weight: 700; }
      pre { overflow-x: auto; margin: 0; padding: 24px; color: #25332d; font: 12px/1.8 ui-monospace, SFMono-Regular, Menlo, monospace; }
      footer { margin-top: 26px; color: var(--muted); font-size: 13px; }
      a { color: var(--green); }
      @media (max-width: 560px) { main { padding-top: 48px; } pre { padding: 16px; font-size: 11px; } }
    </style>
  </head>
  <body>
    <main>
      <div class="eyebrow">Canadian AI Archives · Public API</div>
      <h1>Raw archive URLs for agents.</h1>
      <p class="intro">Fetch this endpoint to discover the selected magazine issues indexed by Canadian AI Solutions. The response is intentionally plain JSON and points directly to the original CAIAC-hosted PDF files.</p>
      <div class="meta"><span><strong>GET</strong> ${endpoint}</span><span><strong>${magazines.length}</strong> indexed issues</span><span><strong>application/json</strong> response</span></div>
      <section class="panel" aria-label="JSON response preview">
        <div class="panel-head"><span>response.json</span><span class="status">200 OK</span></div>
        <pre>${payload.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</pre>
      </section>
      <footer>Canonical source: <a href="https://www.caiac.ca/en/canadian-ai-magazine">CAIAC official archive</a>.</footer>
    </main>
  </body>
</html>`;
}

export function GET(request: NextRequest) {
  const accepts = request.headers.get("accept") ?? "";
  const wantsHtml = accepts.includes("text/html") && !accepts.includes("application/json");

  if (wantsHtml) {
    return new NextResponse(renderPage(), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  }

  return NextResponse.json(getPayload(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

export const dynamic = "force-static";
export const revalidate = 86400;

