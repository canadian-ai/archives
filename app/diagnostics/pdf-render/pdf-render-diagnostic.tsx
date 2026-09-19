"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Magazine } from "@/lib/magazine-data";

type PdfJsModule = typeof import("pdfjs-dist/build/pdf.mjs");
type PdfJsLike = Pick<
  PdfJsModule,
  "getDocument" | "GlobalWorkerOptions" | "version"
>;

interface PdfRenderDiagnosticProps {
  magazine: Magazine;
  pageNumber: number;
}

type RendererStatus = {
  state: "idle" | "loading" | "ready" | "error";
  version?: string;
  pages?: number;
  elapsedMs?: number;
  error?: string;
};

const CURRENT_LABEL = "Current PDF.js";
const OLDER_LABEL = "PDF.js 4.10.38";
const OLDER_VERSION = "4.10.38";

function ensurePromiseCompatibility() {
  const PromiseCompat = Promise as typeof Promise & {
    try?: (
      callback: (...args: unknown[]) => unknown,
      ...args: unknown[]
    ) => Promise<unknown>;
    withResolvers?: <T>() => {
      promise: Promise<T>;
      resolve: (value: T | PromiseLike<T>) => void;
      reject: (reason?: unknown) => void;
    };
  };

  if (!PromiseCompat.withResolvers) {
    PromiseCompat.withResolvers = <T,>() => {
      let resolve!: (value: T | PromiseLike<T>) => void;
      let reject!: (reason?: unknown) => void;
      const promise = new Promise<T>((promiseResolve, promiseReject) => {
        resolve = promiseResolve;
        reject = promiseReject;
      });
      return { promise, resolve, reject };
    };
  }

  if (!PromiseCompat.try) {
    PromiseCompat.try = (callback, ...args) =>
      new Promise((resolve, reject) => {
        try {
          resolve(callback(...args));
        } catch (error) {
          reject(error);
        }
      });
  }
}

async function loadCurrentPdfJs(): Promise<PdfJsLike> {
  ensurePromiseCompatibility();
  return import("pdfjs-dist/build/pdf.mjs");
}

async function loadOlderPdfJs(): Promise<PdfJsLike> {
  ensurePromiseCompatibility();
  const importFromUrl = new Function(
    "url",
    "return import(url)"
  ) as (url: string) => Promise<PdfJsLike>;

  return importFromUrl(
    `https://unpkg.com/pdfjs-dist@${OLDER_VERSION}/build/pdf.mjs`
  );
}

function workerUrlFor(version: string) {
  return `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.mjs`;
}

function cMapUrlFor(version: string) {
  return `https://unpkg.com/pdfjs-dist@${version}/cmaps/`;
}

async function renderPdfPage({
  pdfjs,
  bytes,
  pageNumber,
  canvas,
}: {
  pdfjs: PdfJsLike;
  bytes: Uint8Array;
  pageNumber: number;
  canvas: HTMLCanvasElement;
}) {
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrlFor(pdfjs.version);

  const startedAt = performance.now();
  const loadingTask = pdfjs.getDocument({
    data: bytes.slice().buffer,
    cMapUrl: cMapUrlFor(pdfjs.version),
    cMapPacked: true,
  });

  const pdf = await loadingTask.promise;
  const safePageNumber = Math.min(pageNumber, pdf.numPages);
  const page = await pdf.getPage(safePageNumber);
  const viewport = page.getViewport({ scale: 1.25 });
  const outputScale = Math.min(window.devicePixelRatio || 1, 2);
  const context = canvas.getContext("2d", { alpha: false });

  if (!context) {
    throw new Error("Canvas 2D context unavailable");
  }

  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;

  context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, viewport.width, viewport.height);

  await page.render({
    canvasContext: context,
    viewport,
  }).promise;

  return {
    pages: pdf.numPages,
    elapsedMs: Math.round(performance.now() - startedAt),
  };
}

async function sha256Prefix(bytes: Uint8Array) {
  try {
    const copy = new Uint8Array(bytes).buffer;
    const digest = await crypto.subtle.digest("SHA-256", copy);
    return Array.from(new Uint8Array(digest))
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 20);
  } catch {
    return "unavailable";
  }
}

function Status({ status }: { status: RendererStatus }) {
  if (status.state === "loading") {
    return <span className="text-amber-700">Rendering…</span>;
  }

  if (status.state === "error") {
    return (
      <span className="text-red-700">
        Error: {status.error ?? "Unknown error"}
      </span>
    );
  }

  if (status.state === "ready") {
    return (
      <span className="text-emerald-700">
        Ready · v{status.version} · {status.pages} pages · {status.elapsedMs} ms
      </span>
    );
  }

  return <span className="text-muted-foreground">Waiting</span>;
}

export function PdfRenderDiagnostic({
  magazine,
  pageNumber,
}: PdfRenderDiagnosticProps) {
  const currentCanvasRef = useRef<HTMLCanvasElement>(null);
  const olderCanvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStatus, setCurrentStatus] = useState<RendererStatus>({
    state: "idle",
  });
  const [olderStatus, setOlderStatus] = useState<RendererStatus>({
    state: "idle",
  });
  const [sourceStatus, setSourceStatus] = useState("Fetching exact source bytes…");
  const [sourceHash, setSourceHash] = useState("…");
  const [sourceSize, setSourceSize] = useState<number | null>(null);

  const proxyUrl = useMemo(
    () => `/api/pdf-proxy?url=${encodeURIComponent(magazine.pdfUrl)}`,
    [magazine.pdfUrl]
  );

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setSourceStatus("Fetching exact source bytes…");
        const response = await fetch(proxyUrl, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(
            `Source fetch failed: ${response.status} ${response.statusText}`
          );
        }

        const bytes = new Uint8Array(await response.arrayBuffer());
        if (cancelled) return;

        setSourceSize(bytes.byteLength);
        setSourceHash(await sha256Prefix(bytes));
        setSourceStatus("Source loaded");

        if (!currentCanvasRef.current || !olderCanvasRef.current) {
          throw new Error("Diagnostic canvas did not mount");
        }

        setCurrentStatus({ state: "loading" });
        try {
          const current = await loadCurrentPdfJs();
          const result = await renderPdfPage({
            pdfjs: current,
            bytes,
            pageNumber,
            canvas: currentCanvasRef.current,
          });
          if (!cancelled) {
            setCurrentStatus({
              state: "ready",
              version: current.version,
              ...result,
            });
          }
        } catch (error) {
          if (!cancelled) {
            setCurrentStatus({
              state: "error",
              error: error instanceof Error ? error.message : String(error),
            });
          }
        }

        setOlderStatus({ state: "loading" });
        try {
          const older = await loadOlderPdfJs();
          const result = await renderPdfPage({
            pdfjs: older,
            bytes,
            pageNumber,
            canvas: olderCanvasRef.current,
          });
          if (!cancelled) {
            setOlderStatus({
              state: "ready",
              version: older.version,
              ...result,
            });
          }
        } catch (error) {
          if (!cancelled) {
            setOlderStatus({
              state: "error",
              error: error instanceof Error ? error.message : String(error),
            });
          }
        }
      } catch (error) {
        if (!cancelled) {
          setSourceStatus(
            error instanceof Error ? error.message : "Unable to fetch source"
          );
          setCurrentStatus({ state: "error", error: "Source unavailable" });
          setOlderStatus({ state: "error", error: "Source unavailable" });
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [pageNumber, proxyUrl]);

  const pageHref = (page: number) =>
    `/diagnostics/pdf-render?id=${encodeURIComponent(
      magazine.id
    )}&page=${page}`;

  return (
    <main className="min-h-screen bg-[#f6f6f3] text-foreground">
      <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="border border-foreground/15 bg-white p-5 sm:p-6">
          <p className="brand-kicker">PDF fidelity diagnostic · preview only</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
                {magazine.title} · Volume {magazine.volume} · Page {pageNumber}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Three rendering paths below use the same historical PDF source.
                This route does not change the production reader.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href={pageHref(1)}
                className="border border-foreground/20 bg-white px-3 py-2 hover:border-foreground"
              >
                Page 1 cover
              </a>
              <a
                href={pageHref(2)}
                className="border border-foreground/20 bg-white px-3 py-2 hover:border-foreground"
              >
                Page 2 text
              </a>
              <a
                href={magazine.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground bg-foreground px-3 py-2 text-background"
              >
                Original PDF
              </a>
            </div>
          </div>

          <div className="mt-5 grid gap-2 border-t border-foreground/10 pt-4 font-mono text-[11px] text-muted-foreground sm:grid-cols-3">
            <div>{sourceStatus}</div>
            <div>
              Bytes: {sourceSize === null ? "…" : sourceSize.toLocaleString()}
            </div>
            <div>SHA-256 prefix: {sourceHash}</div>
          </div>
        </div>

        <section className="mt-5 grid gap-5 xl:grid-cols-3">
          <article className="min-w-0 border border-foreground/15 bg-white">
            <div className="border-b border-foreground/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                A · {CURRENT_LABEL}
              </p>
              <p className="mt-2 min-h-5 font-mono text-[10px]">
                <Status status={currentStatus} />
              </p>
            </div>
            <div className="overflow-auto bg-[#e9e9e6] p-3">
              <canvas
                ref={currentCanvasRef}
                className="mx-auto block max-w-full bg-white shadow-sm"
              />
            </div>
          </article>

          <article className="min-w-0 border border-foreground/15 bg-white">
            <div className="border-b border-foreground/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                B · {OLDER_LABEL}
              </p>
              <p className="mt-2 min-h-5 font-mono text-[10px]">
                <Status status={olderStatus} />
              </p>
            </div>
            <div className="overflow-auto bg-[#e9e9e6] p-3">
              <canvas
                ref={olderCanvasRef}
                className="mx-auto block max-w-full bg-white shadow-sm"
              />
            </div>
          </article>

          <article className="min-w-0 border border-foreground/15 bg-white">
            <div className="border-b border-foreground/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                C · Browser native PDF renderer
              </p>
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                Same proxied PDF · browser/PDFium/WebKit decides rendering
              </p>
            </div>
            <iframe
              title="Native browser PDF renderer"
              src={proxyUrl}
              className="h-[760px] w-full bg-white"
            />
          </article>
        </section>

        <section className="mt-5 border border-foreground/15 bg-white p-5">
          <h2 className="font-serif text-2xl">What to compare</h2>
          <ol className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-2">
            <li>
              <strong className="text-foreground">1.</strong> On page 1, inspect
              the large outlined Canadian AI logo. Its interior should stay
              white rather than filling black.
            </li>
            <li>
              <strong className="text-foreground">2.</strong> Check the diagonal
              “Canadian Artificial Intelligence” title. It should remain
              complete and outlined like the original.
            </li>
            <li>
              <strong className="text-foreground">3.</strong> Switch to page 2
              and compare small text, line weight, and column boundaries.
            </li>
            <li>
              <strong className="text-foreground">4.</strong> Repeat page 1 on
              iPhone Safari. Note whether A, B, or C both loads and visually
              matches the original.
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
