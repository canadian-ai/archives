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

        {/* Timeline section */}
        <section id="timeline" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
          <div className="absolute inset-0 grid-bg opacity-20" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <Calendar className="h-3 w-3" />
                Historical Timeline
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                The Evolution of <span className="gradient-text">Canadian AI</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                From expert systems to neural networks, witness the transformation of AI research in Canada
              </p>
            </div>

            {/* Timeline milestones */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  year: "1984",
                  title: "The Beginning",
                  description: "Canadian AI Magazine launches, documenting the nascent AI community",
                  icon: BookOpen,
                },
                {
                  year: "1986",
                  title: "Neural Networks Rise",
                  description: "Coverage of Hinton's move to U of T and connectionist resurgence",
                  icon: Lightbulb,
                },
                {
                  year: "1988",
                  title: "Expert Systems Peak",
                  description: "Height of knowledge-based systems in Canadian industry",
                  icon: Users,
                },
                {
                  year: "1992",
                  title: "Foundation Set",
                  description: "Final issue marks the groundwork for Canada's AI leadership",
                  icon: Calendar,
                },
              ].map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="group relative animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="glass-card relative h-full rounded-2xl p-6 transition-all duration-300 hover:border-primary/30">
                    {/* Glow effect on hover */}
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

        {/* About section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent" />

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                About the Archives
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-muted-foreground leading-relaxed">
                The Canadian AI Magazine was published by the Canadian Society for Computational
                Studies of Intelligence (CSCSI), now known as CAIAC. These 29 issues from 1984-1992
                capture a pivotal era in AI history, featuring articles on expert systems, neural
                networks, natural language processing, and the societal implications of artificial
                intelligence.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                This digital archive preserves these important historical documents, making them
                accessible to researchers, historians, and anyone interested in the roots of modern AI.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="https://www.caiac.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  Visit CAIAC
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/30 py-12">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-foreground">Canadian AI</span>
                <span className="ml-2 text-sm text-muted-foreground">Magazine Archives</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Original publications by the Canadian Artificial Intelligence Association (CAIAC).
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> • </span>
              Digitally preserved for historical research.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
