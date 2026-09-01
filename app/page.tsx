import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MagazineGrid } from "@/components/magazine-grid";
import { BookOpen, Calendar, Users, Lightbulb } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />

      <main>
        <Hero />

        <section id="timeline" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
          <div className="absolute inset-0 grid-bg opacity-20" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <Calendar className="h-3 w-3" />
                Historical context
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                A window into <span className="gradient-text">Canadian AI history</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Key context from CAIAC&apos;s published history and official magazine archive.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  year: "1984",
                  title: "First issue",
                  description: "Graeme Hirst launches Canadian Artificial Intelligence / Intelligence artificielle au Canada; the first issue appears in September.",
                  icon: BookOpen,
                },
                {
                  year: "1984+",
                  title: "A growing community",
                  description: "CAIAC's history describes subsequent issues appearing quarterly as Canada's AI community grew.",
                  icon: Lightbulb,
                },
                {
                  year: "1992",
                  title: "Our current cutoff",
                  description: "This Canadian AI Solutions reader currently indexes volumes 1 through 29, ending at Summer 1992.",
                  icon: Users,
                },
                {
                  year: "2001",
                  title: "The official archive continues",
                  description: "CAIAC's own publication archive lists the magazine through volume 50 in 2001.",
                  icon: Calendar,
                },
              ].map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="group relative animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="glass-card relative h-full rounded-2xl p-6 transition-all duration-300 hover:border-primary/30">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-mono text-3xl font-bold gradient-text">
                          {milestone.year}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                          <milestone.icon className="h-5 w-5" />
                        </div>
                      </div>
                      <h3 className="mb-2 font-semibold text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MagazineGrid />

        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent" />

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                About this reader
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-muted-foreground leading-relaxed">
                Canadian Artificial Intelligence / Intelligence artificielle au Canada was a publication of the
                CSCSI/SCEIO community whose historical materials are now made available by the Canadian
                Artificial Intelligence Association (CAIAC). CAIAC&apos;s official archive lists magazine volumes
                from 1984 through 2001.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                This website is an independent Canadian AI Solutions project inspired by that history. It currently
                indexes a selected set of 29 issues from 1984 through Summer 1992 and links directly to PDFs hosted
                by CAIAC. Canadian AI Solutions does not claim authorship, ownership, institutional continuity, or
                affiliation with CAIAC.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="https://www.caiac.ca/en/canadian-ai-magazine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  View CAIAC&apos;s official archive
                  <span className="text-xs">↗</span>
                </a>
                <a
                  href="https://www.canadian-ai.ca/blog/why-canadian-ai-built-archives"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/50 bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
                >
                  Why Canadian AI built this
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-border/30 py-12">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-foreground">Archives</span>
                <span className="ml-2 text-sm text-muted-foreground">by Canadian AI Solutions</span>
              </div>
            </div>
            <p className="max-w-2xl text-center text-sm text-muted-foreground md:text-right">
              Historical magazine files are hosted by CAIAC and remain subject to CAIAC&apos;s stated copyright terms.
              This independent reader is not affiliated with CAIAC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
