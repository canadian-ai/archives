"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Eye, Loader2 } from "lucide-react";
import type { Magazine } from "@/lib/magazine-data";
import Image from "next/image";
import { getCover } from "@/lib/cover-generator";

interface MagazineCardProps {
  magazine: Magazine;
  index: number;
}

export function MagazineCard({ magazine, index }: MagazineCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isLoadingCover, setIsLoadingCover] = useState(true);
  const [coverError, setCoverError] = useState(false);
  const [loadStatus, setLoadStatus] = useState("Loading...");

  useEffect(() => {
    let mounted = true;

    const loadCover = async () => {
      try {
        setIsLoadingCover(true);
        setCoverError(false);

        // Use the cover generator with multi-layer caching
        const url = await getCover(magazine.id, magazine.pdfUrl, (status) => {
          if (mounted) {
            setLoadStatus(status);
          }
        });

        if (mounted) {
          setCoverUrl(url);
        }
      } catch (error) {
        console.error("Failed to load cover:", magazine.id, error);
        if (mounted) {
          setCoverError(true);
        }
      } finally {
        if (mounted) {
          setIsLoadingCover(false);
        }
      }
    };

    // Stagger loading to avoid overwhelming the browser
    const delay = index * 300;
    const timer = setTimeout(loadCover, delay);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [magazine.id, magazine.pdfUrl, index]);

  return (
    <Link
      href={`/viewer/${magazine.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <article className="relative h-full overflow-hidden rounded-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
        {/* Card background with glassmorphism */}
        <div className="glass-card absolute inset-0 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-accent/5" />

        {/* Neon border effect on hover */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(45, 212, 191, 0.3) 100%)",
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col p-1">
          {/* Cover area */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-secondary/50 to-muted/30">
            {/* Grid pattern background */}
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* Animated scan line */}
            <div
              className={`absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all duration-1000 ${
                isHovered ? "top-0 opacity-100" : "top-full opacity-0"
              }`}
              style={{
                animation: isHovered ? "scanMove 2s linear infinite" : "none",
              }}
            />

            {/* Cover Image or Fallback */}
            {isLoadingCover ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                  <span className="text-xs text-muted-foreground font-mono">
                    {loadStatus}
                  </span>
                </div>
              </div>
            ) : coverUrl && !coverError ? (
              <div className="absolute inset-0">
                <Image
                  src={coverUrl || "/placeholder.svg"}
                  alt={`${magazine.title} cover`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                  unoptimized
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                {/* Decorative circles */}
                <div className="absolute top-4 right-4">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary/50" />
                    <div className="h-2 w-2 rounded-full bg-accent/50" />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  </div>
                </div>

                {/* Volume number */}
                <div className="relative">
                  <span
                    className={`font-mono text-6xl font-bold transition-all duration-500 ${
                      isHovered ? "gradient-text" : "text-foreground/20"
                    }`}
                  >
                    {magazine.volume.toString().padStart(2, "0")}
                  </span>
                  <div
                    className={`absolute inset-0 blur-xl transition-opacity duration-500 ${
                      isHovered ? "opacity-50" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(56, 189, 248, 0.5), rgba(45, 212, 191, 0.5))",
                    }}
                  />
                </div>

                {/* Label */}
                <span className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Volume
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                isHovered
                  ? "bg-background/60 backdrop-blur-sm opacity-100"
                  : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
                <Eye className="h-4 w-4" />
                Read Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>

          {/* Info section */}
          <div className="relative p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {magazine.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {magazine.date}
                </p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                {magazine.volume}
              </div>
            </div>
          </div>
        </div>
      </article>

      <style jsx>{`
        @keyframes scanMove {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </Link>
  );
}
