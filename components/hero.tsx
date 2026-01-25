"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Sparkles, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      };
    };

    const init = () => {
      resize();
      for (let i = 0; i < 80; i++) {
        particles.push(createParticle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
        style={{ pointerEvents: "none" }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-animated opacity-50" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--background)_70%)]" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-20 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Historical Archive Collection</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span className="text-foreground font-medium">1984-1992</span>
        </div>

        {/* Main title */}
        <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-8xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          Canadian{" "}
          <span className="gradient-text relative">
            AI
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,8 Q50,0 100,8"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                className="opacity-50"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(56, 189, 248)" />
                  <stop offset="100%" stopColor="rgb(45, 212, 191)" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="block mt-2 text-muted-foreground/80 text-4xl sm:text-5xl lg:text-6xl font-light">
            Magazine Archives
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          Journey through the pioneering days of artificial intelligence research in Canada.
          A digital preservation of groundbreaking articles, predictions, and discoveries.
        </p>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
          <div className="group flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass border border-primary/20 transition-all duration-300 group-hover:border-primary/50 group-hover:glow-primary">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-foreground">29</p>
              <p className="text-sm text-muted-foreground">Issues</p>
            </div>
          </div>

          <div className="h-12 w-px bg-border/30 hidden sm:block" />

          <div className="group flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass border border-accent/20 transition-all duration-300 group-hover:border-accent/50 group-hover:glow-accent">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Years of History</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-12 duration-700 delay-700">
          <Link href="/viewer/vol-1">
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full bg-primary px-8 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Exploring
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </Link>
          <Link href="#archives">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border/50 bg-transparent px-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
            >
              Browse Archives
            </Button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
