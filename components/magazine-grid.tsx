"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { magazines, getYears } from "@/lib/magazine-data";
import { Button } from "@/components/ui/button";
import { Grid, List, Filter, Loader2 } from "lucide-react";

const MagazineCard = dynamic(
  () => import("./magazine-card").then((mod) => mod.MagazineCard),
  {
    ssr: false,
    loading: () => (
      <div className="glass-card animate-pulse rounded-2xl">
        <div className="aspect-[3/4] rounded-xl bg-muted/50 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/50" />
        </div>
        <div className="p-4 space-y-2">
          <div className="h-4 bg-muted/50 rounded w-3/4" />
          <div className="h-3 bg-muted/30 rounded w-1/2" />
        </div>
      </div>
    ),
  }
);

export function MagazineGrid() {
  const years = getYears();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredMagazines = useMemo(() => {
    return selectedYear
      ? magazines.filter((m) => m.year === selectedYear)
      : magazines;
  }, [selectedYear]);

  return (
    <section id="archives" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Filter className="h-3 w-3" />
              Selected issue browser
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Browse the{" "}
              <span className="gradient-text">selected collection</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {filteredMagazines.length} CAIAC-hosted issues{" "}
              {selectedYear ? `from ${selectedYear}` : "selected from 1984 through Summer 1992"}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="glass flex items-center gap-1 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-8 w-8 p-0 transition-all ${
                  viewMode === "grid"
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-8 w-8 p-0 transition-all ${
                  viewMode === "list"
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>

            <div className="h-6 w-px bg-border/50" />

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedYear === null ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedYear(null)}
                className={`rounded-full text-xs transition-all ${
                  selectedYear === null
                    ? "bg-primary text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                All selected years
              </Button>
              {years.map((year) => (
                <Button
                  key={year}
                  variant={selectedYear === year ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedYear(year)}
                  className={`rounded-full text-xs transition-all ${
                    selectedYear === year
                      ? "bg-primary text-primary-foreground"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredMagazines.map((magazine, index) => (
              <MagazineCard
                key={magazine.id}
                magazine={magazine}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMagazines.map((magazine, index) => (
              <a
                key={magazine.id}
                href={`/viewer/${magazine.id}`}
                className="glass group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-primary/5 hover:border-primary/30 animate-in fade-in slide-in-from-left-4"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 font-mono text-lg font-bold text-primary">
                  {magazine.volume.toString().padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary truncate">
                    {magazine.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Volume {magazine.volume} - {magazine.date}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                    {magazine.year}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {filteredMagazines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground">
              No selected issues found
            </p>
            <p className="mt-1 text-muted-foreground">
              Try adjusting your filters
            </p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => setSelectedYear(null)}
            >
              Clear filters
            </Button>
          </div>
        )}

        <p className="mt-10 text-center text-xs leading-5 text-muted-foreground/70">
          Source PDFs are hosted by CAIAC. For the full official collection, visit CAIAC&apos;s publications archive.
        </p>
      </div>
    </section>
  );
}
