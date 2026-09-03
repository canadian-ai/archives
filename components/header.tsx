"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CaiMark } from "@/components/cai-mark";

const navLinkClass =
  "text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label="Canadian AI Archives home">
          <CaiMark className="h-8 w-8 text-foreground transition-transform duration-300 group-hover:-rotate-6" />
          <div className="leading-none">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-semibold tracking-tight">Canadian AI</span>
              <span className="brand-emerald text-[9px] font-bold uppercase tracking-[0.22em]">Archives</span>
            </div>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              A Canadian AI Solutions history project
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          <Link href="/#archives" className={navLinkClass}>
            Issues
          </Link>
          <Link href="/timeline" className={navLinkClass}>
            Timeline
          </Link>
          <a
            href="https://www.caiac.ca/en/canadian-ai-magazine"
            target="_blank"
            rel="noopener noreferrer"
            className={`${navLinkClass} inline-flex items-center gap-1.5`}
          >
            Official archive
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <Link
            href="/viewer/vol-1"
            className="inline-flex items-center border border-foreground bg-foreground px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            Start reading
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-foreground/15 md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <nav className="border-t border-foreground/10 bg-background px-4 py-6 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-[1500px] flex-col">
            <Link href="/#archives" className="border-b border-foreground/10 py-4 text-sm" onClick={() => setMobileMenuOpen(false)}>
              Browse selected issues
            </Link>
            <Link href="/timeline" className="border-b border-foreground/10 py-4 text-sm" onClick={() => setMobileMenuOpen(false)}>
              Timeline
            </Link>
            <a
              href="https://www.caiac.ca/en/canadian-ai-magazine"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border-b border-foreground/10 py-4 text-sm"
            >
              CAIAC official archive
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/viewer/vol-1"
              className="mt-5 inline-flex justify-center bg-foreground px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-background"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start reading
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
