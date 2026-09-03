"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { getCover } from "@/lib/cover-generator";
import type { Magazine } from "@/lib/magazine-data";
import { cn } from "@/lib/utils";

type EditionSelectorProps = {
  magazines: Magazine[];
  className?: string;
};

export function EditionSelector({ magazines, className }: EditionSelectorProps) {
  const [activeId, setActiveId] = useState<string | null>(magazines[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!magazines.length) {
      setActiveId(null);
      return;
    }

    if (!magazines.some((magazine) => magazine.id === activeId)) {
      setActiveId(magazines[0].id);
    }
  }, [activeId, magazines]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : 0.12 }}
      className={cn("relative w-full", className)}
    >
      <div className="overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-stretch gap-2 pr-5 sm:pr-8">
          {magazines.map((magazine, index) => {
            const isActive = activeId === magazine.id;

            return (
              <motion.div
                key={magazine.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={`Select volume ${magazine.volume}, ${magazine.date}`}
                initial={reduceMotion ? false : { width: "4.75rem", opacity: 0 }}
                animate={{
                  width: isActive ? "clamp(16.5rem, 72vw, 24rem)" : "4.75rem",
                  opacity: 1,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  ease: "easeInOut",
                  delay: reduceMotion ? 0 : Math.min(index * 0.015, 0.2),
                }}
                onClick={(event) => {
                  setActiveId(magazine.id);
                  event.currentTarget.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }}
                onHoverStart={() => setActiveId(magazine.id)}
                onFocus={() => setActiveId(magazine.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveId(magazine.id);
                  }
                }}
                className={cn(
                  "group relative h-[22rem] shrink-0 cursor-pointer overflow-hidden border bg-card outline-none sm:h-[26rem]",
                  isActive
                    ? "border-foreground/30 ring-1 ring-[var(--brand-emerald)]/30"
                    : "border-foreground/10 hover:border-foreground/25 focus-visible:border-[var(--brand-emerald)]",
                )}
              >
                <EditionCover magazine={magazine} active={isActive} />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-60" />

                {!isActive ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center pb-5">
                    <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] font-semibold tracking-[0.16em] text-white/85">
                      VOL. {magazine.volume.toString().padStart(2, "0")}
                    </span>
                  </div>
                ) : null}

                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      key="details"
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : 0.08 }}
                      className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 text-white sm:p-6"
                    >
                      <div className="mb-auto flex items-start justify-between gap-4">
                        <span className="border border-white/25 bg-black/20 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                          Volume {magazine.volume.toString().padStart(2, "0")}
                        </span>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/65">
                          {magazine.year}
                        </span>
                      </div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">Canadian AI archive</p>
                      <h3 className="mt-2 font-serif text-3xl leading-none tracking-[-0.03em] sm:text-4xl">{magazine.date}</h3>
                      <p className="mt-3 max-w-[28ch] text-xs leading-5 text-white/70">
                        Open the original issue in the Canadian AI Archives reader.
                      </p>

                      <Link
                        href={`/viewer/${magazine.id}`}
                        onClick={(event) => event.stopPropagation()}
                        className="mt-5 inline-flex w-fit items-center gap-2 border border-white/45 bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition-colors hover:bg-[var(--brand-emerald)] hover:text-white"
                      >
                        Read issue
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 border-t border-foreground/10 pt-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <span>Hover or tap an edition to expand</span>
        <span className="hidden sm:inline">Scroll horizontally for more →</span>
      </div>
    </motion.div>
  );
}

type EditionCoverProps = {
  magazine: Magazine;
  active: boolean;
};

function EditionCover({ magazine, active }: EditionCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestedRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(active);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (active) {
      setShouldLoad(true);
    }
  }, [active]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || requestedRef.current) {
      return;
    }

    requestedRef.current = true;
    let cancelled = false;
    setLoading(true);

    getCover(magazine.id, magazine.pdfUrl)
      .then((url) => {
        if (!cancelled) {
          setCoverUrl(url);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCoverUrl(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [magazine.id, magazine.pdfUrl, shouldLoad]);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-[#f2f0eb]">
      {coverUrl ? (
        // Generated covers may be data URLs or Vercel Blob URLs, so a plain img keeps both paths compatible.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coverUrl}
          alt={`${magazine.title}, volume ${magazine.volume}, ${magazine.date}`}
          className={cn(
            "h-full w-full object-cover object-top transition duration-500",
            active ? "scale-100 saturate-100" : "scale-[1.02] saturate-[0.78]",
          )}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,#f3f1ec_0%,#e7e3da_100%)] text-foreground">
          {loading ? <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /> : null}
          <span className="font-serif text-5xl tracking-[-0.06em] text-foreground/20">{magazine.volume.toString().padStart(2, "0")}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Canadian AI</span>
        </div>
      )}
    </div>
  );
}

/**
 * Interaction adapted from Skiper UI's HoverExpand_001 / Skiper 52 pattern.
 * Original component by @gurvinder-singh02 (gxuri.me).
 */
