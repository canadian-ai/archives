"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";

import { EditionSelector } from "@/components/edition-selector";
import { Button } from "@/components/ui/button";
import { getYears, magazines } from "@/lib/magazine-data";

export function MagazineGrid() {
  const years = getYears();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filteredMagazines = useMemo(() => {
    return selectedYear ? magazines.filter((magazine) => magazine.year === selectedYear) : magazines;
  }, [selectedYear]);

  return (
    <section id="archives" className="min-h-[calc(100svh-4rem)] border-b border-foreground/10 py-5 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-4">
          <p className="brand-kicker inline-flex items-center gap-2">
            <Filter className="h-3 w-3" />
            Selected issue browser
          </p>
          <p className="hidden text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:block">
            {filteredMagazines.length} issues
          </p>
        </div>

        <div className="flex flex-wrap border-b border-foreground/10 py-4">
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

        {filteredMagazines.length > 0 ? (
          <EditionSelector key={selectedYear ?? "all"} magazines={filteredMagazines} className="mt-5" />
        ) : (
          <div className="border-x border-b border-foreground/10 py-16 text-center">
            <p className="font-serif text-xl">No selected issues found.</p>
            <Button variant="outline" className="mt-5 rounded-none bg-transparent" onClick={() => setSelectedYear(null)}>
              Clear filters
            </Button>
          </div>
        )}

        <p className="mt-5 text-[11px] leading-5 text-muted-foreground">
          Source PDFs are hosted by CAIAC. For the complete official collection, visit CAIAC&apos;s publications archive.
        </p>
      </div>
    </section>
  );
}
