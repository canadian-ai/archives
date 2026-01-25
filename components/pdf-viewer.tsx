"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Loader2,
  RotateCw,
  Bookmark,
  Share2,
  Grid,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchPDFWithCache } from "@/lib/pdf-cache";

// Configure PDF.js worker - match the library version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.mjs`;

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  magazineId: string;
}

interface PageCache {
  [key: number]: ImageBitmap | null;
}

export function PDFViewer({ pdfUrl, title, magazineId }: PDFViewerProps) {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [pageInputValue, setPageInputValue] = useState("1");
  const [downloadProgress, setDownloadProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageCache = useRef<PageCache>({});

  // Load PDF document
  useEffect(() => {
    const loadPDF = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setDownloadProgress(0);

        console.log('[v0] Starting PDF load for:', magazineId);

        // Fetch PDF with caching
        const arrayBuffer = await fetchPDFWithCache(
          magazineId,
          pdfUrl,
          (loaded, total) => {
            const progress = Math.round((loaded / total) * 100);
            setDownloadProgress(progress);
            console.log('[v0] Download progress:', progress, '%');
          }
        );

        console.log('[v0] PDF data loaded, initializing document...');

        // Load PDF from array buffer
        const loadingTask = pdfjsLib.getDocument({
          data: arrayBuffer,
          cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        console.log('[v0] PDF initialized, pages:', pdf.numPages);
        
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setCurrentPage(1);
        setPageInputValue("1");
        setDownloadProgress(100);
      } catch (err) {
        console.error("[v0] Error loading PDF:", err);
        setError(`Failed to load the PDF: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadPDF();

    return () => {
      Object.values(pageCache.current).forEach((bitmap) => {
        if (bitmap) bitmap.close();
      });
      pageCache.current = {};
    };
  }, [pdfUrl, magazineId]);

  // Render current page
  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        setPageLoading(true);
        const page = await pdfDoc.getPage(pageNum);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const viewport = page.getViewport({ scale: scale * 1.5 });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: ctx,
          viewport: viewport,
        }).promise;

        preloadPages(pageNum);
      } catch (err) {
        console.error("Error rendering page:", err);
      } finally {
        setPageLoading(false);
      }
    },
    [pdfDoc, scale]
  );

  // Preload adjacent pages
  const preloadPages = useCallback(
    async (currentPageNum: number) => {
      if (!pdfDoc) return;

      const pagesToPreload = [currentPageNum - 1, currentPageNum + 1].filter(
        (p) => p >= 1 && p <= totalPages && !pageCache.current[p]
      );

      for (const pageNum of pagesToPreload) {
        try {
          const page = await pdfDoc.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1 });
          const offscreenCanvas = new OffscreenCanvas(
            viewport.width,
            viewport.height
          );
          const ctx = offscreenCanvas.getContext("2d");

          if (ctx) {
            await page.render({
              canvasContext: ctx as unknown as CanvasRenderingContext2D,
              viewport: viewport,
            }).promise;

            const bitmap = await createImageBitmap(offscreenCanvas);
            pageCache.current[pageNum] = bitmap;
          }
        } catch {
          // Silently fail for preload errors
        }
      }
    },
    [pdfDoc, totalPages]
  );

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, scale, renderPage]);

  // Navigation
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setPageInputValue(String(newPage));
    }
  }, [currentPage, totalPages]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setPageInputValue(String(newPage));
    }
  }, [currentPage]);

  const goToPage = (pageNum: number) => {
    const validPage = Math.max(1, Math.min(pageNum, totalPages));
    setCurrentPage(validPage);
    setPageInputValue(String(validPage));
    setShowThumbnails(false);
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.value);
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInputValue, 10);
    if (!isNaN(pageNum)) {
      goToPage(pageNum);
    }
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNextPage();
      else goToPrevPage();
    }

    setTouchStart(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevPage();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "g") {
        e.preventDefault();
        setShowThumbnails((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  // Fullscreen listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <RotateCw className="h-8 w-8 text-destructive" />
        </div>
        <p className="text-lg font-medium text-foreground">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="bg-transparent"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col ${
        isFullscreen ? "h-screen bg-background" : "h-[calc(100vh-8rem)]"
      }`}
    >
      {/* Controls Header */}
      <div className="glass relative z-20 flex items-center justify-between border-b border-border/30 px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage <= 1 || isLoading}
              className="h-9 w-9 rounded-xl p-0 transition-all hover:bg-primary/10 hover:text-primary disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous page</span>
            </Button>

            <form onSubmit={handlePageInputSubmit} className="flex items-center">
              <input
                type="text"
                value={pageInputValue}
                onChange={handlePageInputChange}
                className="w-12 rounded-lg bg-secondary/50 px-2 py-1.5 text-center font-mono text-sm text-foreground outline-none transition-all focus:bg-secondary focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
              />
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="font-mono text-sm text-muted-foreground">
                {isLoading ? "..." : totalPages}
              </span>
            </form>

            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage >= totalPages || isLoading}
              className="h-9 w-9 rounded-xl p-0 transition-all hover:bg-primary/10 hover:text-primary disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>

          <div className="hidden h-6 w-px bg-border/50 sm:block" />

          {/* Thumbnails toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`hidden h-9 w-9 rounded-xl p-0 transition-all sm:flex ${
              showThumbnails
                ? "bg-primary/20 text-primary"
                : "hover:bg-primary/10 hover:text-primary"
            }`}
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">Toggle thumbnails</span>
          </Button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden items-center gap-1 rounded-xl bg-secondary/30 p-1 sm:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              className="h-8 w-8 rounded-lg p-0 transition-all hover:bg-primary/10 hover:text-primary disabled:opacity-30"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="min-w-[50px] text-center font-mono text-xs text-muted-foreground">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              disabled={scale >= 3}
              className="h-8 w-8 rounded-lg p-0 transition-all hover:bg-primary/10 hover:text-primary disabled:opacity-30"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-6 w-px bg-border/50" />

          {/* Action buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-9 w-9 rounded-xl p-0 transition-all hover:bg-primary/10 hover:text-primary"
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 rounded-xl p-0 transition-all hover:bg-primary/10 hover:text-primary"
          >
            <Bookmark className="h-4 w-4" />
            <span className="sr-only">Bookmark</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="h-9 w-9 rounded-xl p-0 transition-all hover:bg-primary/10 hover:text-primary"
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle fullscreen</span>
          </Button>
        </div>
      </div>

      {/* Main viewer area */}
      <div className="relative flex-1 overflow-hidden">
        {/* Thumbnails panel */}
        {showThumbnails && (
          <div className="absolute left-0 top-0 bottom-0 z-10 w-48 overflow-y-auto border-r border-border/30 bg-background/95 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-2 p-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    type="button"
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`group relative aspect-[3/4] overflow-hidden rounded-lg border transition-all ${
                      currentPage === pageNum
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border/30 hover:border-primary/50"
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 text-xs font-mono text-muted-foreground">
                      {pageNum}
                    </div>
                    <div
                      className={`absolute inset-0 bg-primary/10 transition-opacity ${
                        currentPage === pageNum
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-50"
                      }`}
                    />
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* PDF Canvas */}
        <div
          className={`relative h-full overflow-auto transition-all duration-300 ${
            showThumbnails ? "ml-48" : "ml-0"
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Loading overlay */}
          {(isLoading || pageLoading) && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-primary/20" />
                  <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="font-mono text-sm text-muted-foreground">
                    {isLoading ? "Loading magazine..." : "Rendering page..."}
                  </p>
                  {isLoading && downloadProgress > 0 && downloadProgress < 100 && (
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {downloadProgress}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Canvas container */}
          <div className="flex min-h-full items-center justify-center p-6">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 blur-xl opacity-50" />

              {/* Canvas */}
              <canvas
                ref={canvasRef}
                className="relative max-w-full rounded-xl shadow-2xl shadow-black/50 ring-1 ring-border/20"
                style={{
                  maxHeight: isFullscreen
                    ? "calc(100vh - 80px)"
                    : "calc(100vh - 12rem)",
                }}
              />
            </div>
          </div>

          {/* Swipe hint for mobile */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 text-xs text-muted-foreground sm:hidden">
            Swipe to navigate pages
          </div>
        </div>

        {/* Side navigation buttons (desktop) */}
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="absolute left-4 top-1/2 -translate-y-1/2 hidden h-12 w-12 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-0 md:flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden h-12 w-12 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-0 md:flex"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 bg-secondary/50">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        />
        {/* Page markers */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: Math.min(totalPages, 20) }, (_, i) => {
            const pageNum =
              Math.round((i / 19) * (totalPages - 1)) + 1;
            return (
              <button
                type="button"
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className="relative flex-1 group"
                title={`Page ${pageNum}`}
              >
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full transition-all ${
                    currentPage === pageNum
                      ? "bg-primary scale-150"
                      : "bg-muted-foreground/30 group-hover:bg-primary/50 group-hover:scale-125"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="hidden absolute bottom-16 right-4 glass rounded-lg px-3 py-2 text-xs text-muted-foreground lg:block">
        <span className="font-mono">←</span> <span className="font-mono">→</span> Navigate
        <span className="mx-2">•</span>
        <span className="font-mono">+</span> <span className="font-mono">-</span> Zoom
        <span className="mx-2">•</span>
        <span className="font-mono">G</span> Grid
      </div>
    </div>
  );
}
