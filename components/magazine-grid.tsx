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
    <section id="archives" className="border-b border-foreground/10 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 md:px-12 lg:px-14 xl:px-20">
        <div className="border-b border-foreground/10 pb-10">
          <p className="brand-kicker inline-flex items-center gap-2">
            <Filter className="h-3 w-3" />
            Selected issue browser
          </p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl">
            Choose an edition from the shelf.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            {filteredMagazines.length} CAIAC-hosted issues {selectedYear ? `from ${selectedYear}` : "selected from 1984 through Summer 1992"}. Hover or tap a cover to bring that edition forward.
          </p>
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

        {filteredMagazines.length > 0 ? (
          <EditionSelector key={selectedYear ?? "all"} magazines={filteredMagazines} className="mt-8" />
        ) : (
          <div className="border-x border-b border-foreground/10 py-16 text-center">
            <p className="font-serif text-xl">No selected issues found.</p>
            <Button variant="outline" className="mt-5 rounded-none bg-transparent" onClick={() => setSelectedYear(null)}>
              Clear filters
            </Button>
          </div>
        )}

        <p className="mt-8 text-xs leading-5 text-muted-foreground">
          Source PDFs are hosted by CAIAC. For the complete official collection, visit CAIAC&apos;s publications archive.
        </p>
      </div>
    </section>
  );
}
