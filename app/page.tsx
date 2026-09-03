import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MagazineGrid } from "@/components/magazine-grid";
import { CaiMark } from "@/components/cai-mark";

const milestones = [
  {
    year: "1984",
    title: "The first issue appears",
    description:
      "Graeme Hirst launches Canadian Artificial Intelligence / Intelligence artificielle au Canada; the first issue appears in September.",
  },
  {
    year: "1984+",
    title: "A community takes shape",
    description:
      "CAIAC's history describes subsequent issues appearing quarterly as Canada's artificial intelligence community grew.",
  },
  {
    year: "1992",
    title: "The current reader cutoff",
    description:
      "This Canadian AI Solutions reader currently indexes volumes 1 through 29, ending at Summer 1992.",
  },
  {
    year: "2001",
    title: "The official archive continues",
    description:
      "CAIAC's own publication archive lists the magazine through volume 50 in 2001; this site links back to that canonical collection.",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain" />
      <Header />

      <main>
        <Hero />

        <section id="timeline" className="border-b border-foreground/10">
          <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[0.72fr_1.28fr]">
            <div className="px-5 py-16 sm:px-8 md:px-12 lg:border-r lg:border-foreground/10 lg:px-14 lg:py-24 xl:px-20">
              <p className="brand-kicker">Historical context</p>
              <h2 className="mt-5 max-w-md font-serif text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl">
                The archive is more than a stack of PDFs.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
                It is a record of how researchers, institutions, and builders in Canada talked about artificial
                intelligence while the field was still taking shape.
              </p>
              <Link
                href="/timeline"
                className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
              >
                Explore prediction timeline
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="divide-y divide-foreground/10">
              {milestones.map((milestone) => (
                <article
                  key={milestone.year}
                  className="group grid gap-5 px-5 py-9 transition-colors hover:bg-[var(--brand-emerald-soft)] sm:grid-cols-[8rem_1fr] sm:px-8 md:px-12 lg:px-14 xl:px-16"
                >
                  <div className="brand-emerald font-mono text-sm font-semibold">{milestone.year}</div>
                  <div>
                    <h3 className="font-serif text-2xl tracking-[-0.02em]">{milestone.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{milestone.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <MagazineGrid />

        <section className="bg-foreground text-background">
          <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2">
            <div className="border-b border-background/15 px-5 py-16 sm:px-8 md:px-12 lg:border-b-0 lg:border-r lg:px-14 lg:py-24 xl:px-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-400">About this reader</p>
              <h2 className="mt-5 max-w-lg font-serif text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl">
                Preserve the context. Point back to the source.
              </h2>
            </div>
            <div className="px-5 py-16 sm:px-8 md:px-12 lg:px-14 lg:py-24 xl:px-20">
              <p className="max-w-2xl text-sm leading-7 text-background/70">
                <em>Canadian Artificial Intelligence / Intelligence artificielle au Canada</em> was a publication of
                the CSCSI/SCEIO community whose historical materials are now made available by the Canadian Artificial
                Intelligence Association (CAIAC). CAIAC&apos;s official archive lists magazine volumes from 1984 through 2001.
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-background/70">
                This website is an independent Canadian AI Solutions project inspired by that history. It currently
                indexes a selected set of 29 issues from 1984 through Summer 1992 and links directly to PDFs hosted by
                CAIAC. Canadian AI Solutions does not claim authorship, ownership, institutional continuity, or affiliation
                with CAIAC.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://www.caiac.ca/en/canadian-ai-magazine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-background bg-background px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-transparent hover:text-background"
                >
                  CAIAC official archive
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                <a
                  href="https://www.canadian-ai.ca/blog/why-canadian-ai-built-archives"
                  className="inline-flex items-center justify-center gap-2 border border-background/35 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-background transition-colors hover:border-emerald-400 hover:text-emerald-400"
                >
                  Why Canadian AI built this
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-foreground/10 bg-background">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-5 py-10 sm:px-8 md:px-12 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <CaiMark className="h-9 w-9" />
            <div>
              <p className="font-serif text-lg">Canadian AI Archives</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Canadian AI Solutions · Montréal</p>
            </div>
          </div>
          <p className="max-w-2xl text-xs leading-5 text-muted-foreground lg:text-right">
            Historical magazine files are hosted by CAIAC and remain subject to CAIAC&apos;s stated copyright terms.
            This independent reader is not affiliated with CAIAC.
          </p>
        </div>
      </footer>
    </div>
  );
}
