"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-border/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:glow-primary">
            <BookOpen className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 rounded-xl border border-primary/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-tight tracking-tight text-foreground">
              Canadian <span className="gradient-text">AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Magazine Archives
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
            >
              Archives
            </Button>
          </Link>
          <Link href="/timeline">
            <Button
              variant="ghost"
              className="text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
            >
              Timeline
            </Button>
          </Link>
          <a
            href="https://www.caiac.ca"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              className="gap-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
            >
              CAIAC
              <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
          <div className="ml-2 h-6 w-px bg-border/50" />
          <Link href="/viewer/vol-1">
            <Button className="ml-2 gap-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
              Start Reading
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="glass absolute top-full left-0 right-0 border-b border-border/30 md:hidden">
          <nav className="flex flex-col p-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Archives
              </Button>
            </Link>
            <Link href="/timeline" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Timeline
              </Button>
            </Link>
            <a
              href="https://www.caiac.ca"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" className="w-full justify-start gap-2">
                CAIAC
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
            <Link href="/viewer/vol-1" onClick={() => setMobileMenuOpen(false)}>
              <Button className="mt-2 w-full rounded-full bg-primary text-primary-foreground">
                Start Reading
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
