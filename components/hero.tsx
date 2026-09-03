import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { CaiMetallicMark } from "@/components/cai-metallic-mark";

export function Hero() {
  return (
    <section className="border-b border-foreground/10">
      <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[1500px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-8 md:px-12 lg:border-r lg:border-foreground/10 lg:px-14 xl:px-20">
          <p className="brand-kicker mb-6">Canadian AI · Historical project · 1984—1992</p>

          <h1 className="max-w-3xl text-balance font-serif text-5xl leading-[0.96] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            A living window into Canada&apos;s AI history.
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Explore a selected run of <em>Canadian Artificial Intelligence / Intelligence artificielle au Canada</em>
            through CAIAC&apos;s official archive. Canadian AI Solutions built this reader as a tribute to the history
            behind our name and the people who helped shape the field in Canada.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/viewer/vol-1"
              className="group inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-transparent hover:text-foreground"
            >
              Start reading
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#archives"
              className="inline-flex items-center justify-center gap-2 border border-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-foreground hover:text-background"
            >
              Browse issues
              <ArrowDown className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-foreground/10 py-5">
            <div>
              <p className="font-serif text-2xl">29</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Selected issues</p>
            </div>
            <div className="border-x border-foreground/10 px-5">
              <p className="font-serif text-2xl">1984</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">First issue</p>
            </div>
            <div className="pl-5">
              <p className="font-serif text-2xl">1992</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Current cutoff</p>
            </div>
          </div>

          <p className="mt-7 max-w-xl text-[10px] leading-5 text-muted-foreground/75">
            Independent reader by Canadian AI Solutions. Historical magazine files are hosted by CAIAC and remain
            subject to CAIAC&apos;s stated copyright terms. Canadian AI Solutions is not affiliated with CAIAC.
          </p>
        </div>

        <div className="relative min-h-[520px] overflow-hidden bg-white lg:min-h-0">
          <div className="absolute inset-0 grid-bg opacity-80" />
          <div className="absolute inset-x-0 top-0 h-px bg-foreground/10 lg:hidden" />
          <div className="absolute left-5 top-5 z-10 flex items-center gap-2 sm:left-8 sm:top-8">
            <span className="h-2 w-2 bg-[var(--brand-emerald)]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Canadian AI mark · 3D study
            </span>
          </div>
          <div className="absolute right-5 top-5 z-10 font-mono text-[9px] text-muted-foreground sm:right-8 sm:top-8">
            ARCHIVE / 001
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <CaiMetallicMark className="h-full max-h-[680px] min-h-[430px] max-w-[720px]" speed={1.25} scale={0.92} />
          </div>

          <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between border-t border-foreground/10 pt-4 sm:bottom-8 sm:left-8 sm:right-8">
            <p className="max-w-xs text-[9px] uppercase leading-5 tracking-[0.18em] text-muted-foreground">
              Past ideas. Present context. Canadian software history kept readable.
            </p>
            <span className="brand-emerald font-mono text-[10px]">CAI / MTL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
