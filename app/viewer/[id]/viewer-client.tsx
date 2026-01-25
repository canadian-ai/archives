"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  BookOpen,
  Calendar,
} from "lucide-react";
import type { Magazine } from "@/lib/magazine-data";
import { PDFViewer } from "@/components/pdf-viewer";
import { Button } from "@/components/ui/button";

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
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-border/30">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 rounded-xl transition-all hover:bg-primary/10 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Archives</span>
              </Button>
            </Link>

            <div className="hidden h-6 w-px bg-border/50 sm:block" />

            {/* Magazine info */}
            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h1 className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {magazine.title}
                  <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">
                    Vol. {magazine.volume}
                  </span>
                </h1>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {magazine.date}
                </p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Issue navigation */}
            <div className="flex items-center gap-1">
              {prevMagazine ? (
                <Link href={`/viewer/${prevMagazine.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 rounded-xl transition-all hover:bg-primary/10 hover:text-primary"
                    title={`Volume ${prevMagazine.volume}`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden font-mono text-xs sm:inline">
                      {prevMagazine.volume.toString().padStart(2, "0")}
                    </span>
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="gap-1 rounded-xl opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}

              <div className="glass flex items-center gap-1 rounded-lg px-3 py-1.5">
                <span className="font-mono text-sm font-bold text-primary">
                  {magazine.volume.toString().padStart(2, "0")}
                </span>
                <span className="text-xs text-muted-foreground">
                  / {totalMagazines}
                </span>
              </div>

              {nextMagazine ? (
                <Link href={`/viewer/${nextMagazine.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 rounded-xl transition-all hover:bg-primary/10 hover:text-primary"
                    title={`Volume ${nextMagazine.volume}`}
                  >
                    <span className="hidden font-mono text-xs sm:inline">
                      {nextMagazine.volume.toString().padStart(2, "0")}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="gap-1 rounded-xl opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="h-6 w-px bg-border/50" />

            {/* Actions */}
            <a href={magazine.pdfUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 rounded-xl transition-all hover:bg-primary/10 hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Open</span>
              </Button>
            </a>
            <a href={magazine.pdfUrl} download>
              <Button
                size="sm"
                className="gap-2 rounded-xl bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile title bar */}
      <div className="glass border-b border-border/30 px-4 py-3 sm:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-lg font-bold text-primary">
            {magazine.volume.toString().padStart(2, "0")}
          </div>
          <div>
            <h1 className="font-medium text-foreground">{magazine.title}</h1>
            <p className="text-xs text-muted-foreground">{magazine.date}</p>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <main className="relative">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <PDFViewer
          pdfUrl={magazine.pdfUrl}
          title={`Vol. ${magazine.volume} - ${magazine.date}`}
          magazineId={magazine.id}
        />
      </main>
    </div>
  );
}
