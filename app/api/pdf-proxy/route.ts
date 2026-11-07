const ALLOWED_HOST = "caiac.ca";
const MAX_PDF_BYTES = 25 * 1024 * 1024;

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("url");
  if (!raw) return new Response("Missing URL parameter", { status: 400 });

  let source: URL;
  try {
    source = new URL(raw);
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }
  if (source.protocol !== "https:" ||
      (source.hostname !== ALLOWED_HOST && !source.hostname.endsWith(`.${ALLOWED_HOST}`)) ||
      source.username || source.password || (source.port && source.port !== "443")) {
    return new Response("PDF source not allowed", { status: 403 });
  }
  try {
    const upstream = await fetch(source, {
      redirect: "manual",
      signal: AbortSignal.timeout(10000),
      headers: { "Accept": "application/pdf" },
    });
    if (!upstream.ok) {
      return new Response("PDF source unavailable", { status: 502 });
    }
    const length = Number(upstream.headers.get("content-length"));
    if (length > MAX_PDF_BYTES) return new Response("PDF too large", { status: 413 });
    const type = upstream.headers.get("content-type")?.toLowerCase() ?? "";
    if (!type.includes("application/pdf") && !source.pathname.toLowerCase().endsWith(".pdf")) {
      return new Response("Not a PDF", { status: 415 });
    }
    const body = await upstream.arrayBuffer();
    if (body.byteLength > MAX_PDF_BYTES || body.byteLength < 5) {
      return new Response("Invalid PDF size", { status: 413 });
    }
    const signature = new TextDecoder().decode(body.slice(0, 5));
    if (signature !== "%PDF-") return new Response("Invalid PDF", { status: 415 });
    return new Response(body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("PDF fetch failed", { status: 502 });
  }
}
