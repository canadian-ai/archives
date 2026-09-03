"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Filter, Grid, List, Loader2 } from "lucide-react";
import { magazines, getYears } from "@/lib/magazine-data";
import { Button } from "@/components/ui/button";

const MagazineCard = dynamic(
  () => import("./magazine-card").then((mod) => mod.MagazineCard),
  {
    ssr: false,
    loading: () => (
      <div className="border border-foreground/10 bg-card">
        <div className="flex aspect-[3/4] items-center justify-center bg-secondary/60">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
        <div className="space-y-2 border-t border-foreground/10 p-4">
          <div className="h-3 w-3/4 bg-muted" />
          <div className="h-2 w-1/2 bg-muted/70" />
        </div>
      </div>
    ),
  },
);

export function MagazineGrid() {
  const years = getYears();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredMagazines = useMemo(() => {
    return selectedYear ? magazines.filter((magazine) => magazine.year === selectedYear) : magazines;
  }, [selectedYear]);

  return (
    <section id="archives" className="border-b border-foreground/10 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 md:px-12 lg:px-14 xl:px-20">
        <div className="grid gap-10 border-b border-foreground/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="brand-kicker inline-flex items-center gap-2">
              <Filter className="h-3 w-3" />
              Selected issue browser
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl">
              Read the collection issue by issue.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              {filteredMagazines.length} CAIAC-hosted issues {selectedYear ? `from ${selectedYear}` : "selected from 1984 through Summer 1992"}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`h-9 w-9 rounded-none p-0 ${viewMode === "grid" ? "border-foreground bg-foreground text-background hover:bg-foreground/85 hover:text-background" : "bg-transparent"}`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("list")}
              className={`h-9 w-9 rounded-none p-0 ${viewMode === "list" ? "border-foreground bg-foreground text-background hover:bg-foreground/85 hover:text-background" : "bg-transparent"}`}
            >
              <List className="h-3.5 w-3.5" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap border-b border-foreground/10 py-5">
          <button
            type="button"
            onClick={() => setSelectedYear(null)}
            className={`border-r border-foreground/10 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] transition-colors sm:px-4 ${
              selectedYear === null
                ? "brand-emerald bg-[var(--brand-emerald-soft)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All years
          </button>
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setSelectedYear(year)}
              className={`border-r border-foreground/10 px-3 py-2 font-mono text-[10px] transition-colors sm:px-4 ${
                selectedYear === year
                  ? "brand-emerald bg-[var(--brand-emerald-soft)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {viewMode === "grid" ? (
          <div className="mt-8 grid grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredMagazines.map((magazine, index) => (
              <MagazineCard key={magazine.id} magazine={magazine} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-foreground/10">
            {filteredMagazines.map((magazine) => (
              <a
                key={magazine.id}
                href={`/viewer/${magazine.id}`}
                className="group grid gap-3 border-b border-foreground/10 bg-card px-4 py-4 last:border-b-0 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:px-5"
              >
                <span className="brand-emerald font-mono text-sm font-semibold">VOL. {magazine.volume.toString().padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-lg transition-colors group-hover:text-[var(--brand-emerald-strong)]">
                    {magazine.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{magazine.date}</p>
                </div>
                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:block">
                  Read issue →
                </span>
              </a>
            ))}
          </div>
        )}

        {filteredMagazines.length === 0 ? (
          <div className="border-x border-b border-foreground/10 py-16 text-center">
            <p className="font-serif text-xl">No selected issues found.</p>
            <Button variant="outline" className="mt-5 rounded-none bg-transparent" onClick={() => setSelectedYear(null)}>
              Clear filters
            </Button>
          </div>
        ) : null}

        <p className="mt-8 text-xs leading-5 text-muted-foreground">
          Source PDFs are hosted by CAIAC. For the complete official collection, visit CAIAC&apos;s publications archive.
        </p>
      </div>
    </section>
  );
}
