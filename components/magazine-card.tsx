"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import type { Magazine } from "@/lib/magazine-data";
import { getCover } from "@/lib/cover-generator";

interface MagazineCardProps {
  magazine: Magazine;
  index: number;
}

export function MagazineCard({ magazine, index }: MagazineCardProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isLoadingCover, setIsLoadingCover] = useState(true);
  const [coverError, setCoverError] = useState(false);
  const [loadStatus, setLoadStatus] = useState("Loading cover");

  useEffect(() => {
    let mounted = true;

    const loadCover = async () => {
      try {
        setIsLoadingCover(true);
        setCoverError(false);
        const url = await getCover(magazine.id, magazine.pdfUrl, (status) => {
          if (mounted) setLoadStatus(status);
        });
        if (mounted) setCoverUrl(url);
      } catch (error) {
        console.error("Failed to load cover:", magazine.id, error);
        if (mounted) setCoverError(true);
      } finally {
        if (mounted) setIsLoadingCover(false);
      }
    };

    const timer = setTimeout(loadCover, index * 220);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [index, magazine.id, magazine.pdfUrl]);

  return (
    <Link href={`/viewer/${magazine.id}`} className="group block bg-background">
      <article className="relative h-full bg-card transition-transform duration-300 group-hover:-translate-y-1">
        <div className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-[var(--brand-emerald)] transition-transform duration-300 group-hover:scale-x-100" />

        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          {isLoadingCover ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-3 text-center">
              <Loader2 className="brand-emerald h-5 w-5 animate-spin" />
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{loadStatus}</span>
            </div>
          ) : coverUrl && !coverError ? (
            <Image
              src={coverUrl}
              alt={`${magazine.title} cover`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 grid-bg flex flex-col items-center justify-center px-4 text-center">
              <span className="brand-emerald font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">Canadian AI</span>
              <span className="mt-3 font-serif text-6xl leading-none text-foreground/80">
                {magazine.volume.toString().padStart(2, "0")}
              </span>
              <span className="mt-2 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Archive volume</span>
            </div>
          )}

          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex w-full items-center justify-between border border-white/40 bg-black/75 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              Open issue
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        <div className="border-t border-foreground/10 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="brand-emerald font-mono text-[9px] font-semibold uppercase tracking-[0.16em]">
                Vol. {magazine.volume.toString().padStart(2, "0")}
              </p>
              <h3 className="mt-2 line-clamp-2 font-serif text-base leading-5 tracking-[-0.015em]">{magazine.title}</h3>
              <p className="mt-2 text-[10px] text-muted-foreground">{magazine.date}</p>
            </div>
            <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-[var(--brand-emerald-strong)]" />
          </div>
        </div>
      </article>
    </Link>
  );
}
