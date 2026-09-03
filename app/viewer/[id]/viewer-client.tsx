"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
} from "lucide-react";
import type { Magazine } from "@/lib/magazine-data";
import { PDFViewer } from "@/components/pdf-viewer";
import { CaiMark } from "@/components/cai-mark";

interface ViewerClientProps {
  magazine: Magazine;
  prevMagazine: Magazine | null;
  nextMagazine: Magazine | null;
  totalMagazines: number;
}

export function ViewerClient({
  magazine,
  prevMagazine,
  nextMagazine,
  totalMagazines,
}: ViewerClientProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="grain" />

      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-[1500px] items-center justify-between gap-3 px-3 sm:px-5 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <Link
              href="/"
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-foreground/10 transition-colors hover:border-foreground"
              aria-label="Back to Archives"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>

            <div className="hidden h-7 w-px bg-foreground/10 sm:block" />

            <div className="flex min-w-0 items-center gap-3">
              <CaiMark className="hidden h-7 w-7 shrink-0 sm:block" />
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="brand-emerald shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.14em]">
                    Vol. {magazine.volume.toString().padStart(2, "0")}
                  </span>
                  <h1 className="truncate font-serif text-sm sm:text-base">{magazine.title}</h1>
                </div>
                <p className="mt-0.5 hidden text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:block">
                  {magazine.date} · Canadian AI Archives
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {prevMagazine ? (
              <Link
                href={`/viewer/${prevMagazine.id}`}
                className="flex h-9 items-center gap-1 border border-foreground/10 px-2 text-xs transition-colors hover:border-foreground sm:px-3"
                title={`Previous: Volume ${prevMagazine.volume}`}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden font-mono text-[9px] sm:inline">{prevMagazine.volume.toString().padStart(2, "0")}</span>
              </Link>
            ) : (
              <span className="flex h-9 w-9 items-center justify-center border border-foreground/10 opacity-25">
                <ChevronLeft className="h-3.5 w-3.5" />
              </span>
            )}

            <span className="hidden h-9 items-center border border-foreground/10 px-3 font-mono text-[9px] text-muted-foreground md:flex">
              {magazine.volume.toString().padStart(2, "0")} / {totalMagazines.toString().padStart(2, "0")}
            </span>

            {nextMagazine ? (
              <Link
                href={`/viewer/${nextMagazine.id}`}
                className="flex h-9 items-center gap-1 border border-foreground/10 px-2 text-xs transition-colors hover:border-foreground sm:px-3"
                title={`Next: Volume ${nextMagazine.volume}`}
              >
                <span className="hidden font-mono text-[9px] sm:inline">{nextMagazine.volume.toString().padStart(2, "0")}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <span className="flex h-9 w-9 items-center justify-center border border-foreground/10 opacity-25">
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            )}

            <a
              href={magazine.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center gap-1.5 border border-foreground/10 px-3 text-[9px] font-semibold uppercase tracking-[0.13em] transition-colors hover:border-foreground sm:flex"
            >
              Open
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={magazine.pdfUrl}
              download
              className="brand-emerald-bg flex h-9 items-center gap-1.5 border border-[var(--brand-emerald)] px-3 text-[9px] font-semibold uppercase tracking-[0.13em] transition-opacity hover:opacity-85"
            >
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline">PDF</span>
            </a>
          </div>
        </div>
      </header>

      <div className="border-b border-foreground/10 px-4 py-3 sm:hidden">
        <p className="text-xs text-muted-foreground">{magazine.date} · Canadian AI Archives</p>
      </div>

      <main className="relative bg-secondary/50">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-45" />
        <PDFViewer
          pdfUrl={magazine.pdfUrl}
          title={`Vol. ${magazine.volume} - ${magazine.date}`}
          magazineId={magazine.id}
        />
      </main>
    </div>
  );
}
