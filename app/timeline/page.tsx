"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Clock, Filter, Sparkles, Target } from "lucide-react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  predictions,
  categories,
  years,
  getStatusColor,
  getStatusBgColor,
  getStatusLabel,
  type Prediction,
} from "@/lib/timeline-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TimelineCard({ prediction, currentYear }: { prediction: Prediction; currentYear: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const yearsAgo = currentYear - prediction.year;

  const statusIcon = {
    fulfilled: <CheckCircle2 className="h-3.5 w-3.5" />,
    exceeded: <Sparkles className="h-3.5 w-3.5" />,
    partial: <Clock className="h-3.5 w-3.5" />,
    unfulfilled: <AlertCircle className="h-3.5 w-3.5" />,
  };

  return (
    <article className="grid border-b border-foreground/10 md:grid-cols-[9rem_1fr]">
      <div className="border-b border-foreground/10 px-5 py-6 md:border-b-0 md:border-r md:px-6 md:py-8">
        <p className="brand-emerald font-mono text-lg font-semibold">{prediction.year}</p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{yearsAgo} years ago</p>
      </div>

      <button
        type="button"
        className="group w-full px-5 py-6 text-left transition-colors hover:bg-[var(--brand-emerald-soft)] md:px-8 md:py-8"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span>{prediction.category}</span>
              <span aria-hidden="true">/</span>
              <span>{prediction.scope}</span>
            </div>
            <h3 className="mt-3 font-serif text-2xl tracking-[-0.02em] sm:text-3xl">{prediction.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${getStatusBgColor(
                prediction.status,
              )} ${getStatusColor(prediction.status)}`}
            >
              {statusIcon[prediction.status]}
              {getStatusLabel(prediction.status)}
            </span>
            <span className="flex h-8 w-8 items-center justify-center border border-foreground/10 bg-background">
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </span>
          </div>
        </div>

        <div className="mt-5 max-w-3xl">
          <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <Target className="h-3.5 w-3.5" />
            Original prediction
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground/75">{prediction.prediction}</p>
        </div>

        {isExpanded ? (
          <div className="mt-6 max-w-3xl border-t border-foreground/10 pt-6">
            <p className="brand-emerald flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em]">
              <Sparkles className="h-3.5 w-3.5" />
              Outcome as of {currentYear}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/75">{prediction.outcome}</p>
            <p className="mt-4 font-mono text-[9px] text-muted-foreground">Source: {prediction.source}</p>
          </div>
        ) : null}
      </button>
    </article>
  );
}

export default function TimelinePage() {
  const currentYear = new Date().getFullYear();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredPredictions = useMemo(() => {
    return predictions.filter((prediction) => {
      if (selectedCategory !== "all" && prediction.category !== selectedCategory) return false;
      if (selectedYear !== "all" && prediction.year !== Number.parseInt(selectedYear, 10)) return false;
      if (selectedStatus !== "all" && prediction.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedCategory, selectedStatus, selectedYear]);

  const stats = useMemo(() => {
    const realized = predictions.filter((prediction) => prediction.status === "fulfilled" || prediction.status === "exceeded").length;
    const partial = predictions.filter((prediction) => prediction.status === "partial").length;
    const emerging = predictions.filter((prediction) => prediction.status === "unfulfilled").length;
    return { realized, partial, emerging, total: predictions.length };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="grain" />
      <Header />

      <main>
        <section className="border-b border-foreground/10">
          <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[1fr_0.72fr]">
            <div className="px-5 py-16 sm:px-8 md:px-12 lg:border-r lg:border-foreground/10 lg:px-14 lg:py-24 xl:px-20">
              <p className="brand-kicker">Prediction timeline · Archive interpretation</p>
              <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                The future, described from the past.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                A reading of early Canadian AI predictions against what became possible. The interesting part is not
                whether every date was right; it is how much of the direction of travel was visible decades in advance.
              </p>
            </div>

            <div className="grid grid-cols-2 border-t border-foreground/10 lg:border-t-0">
              {[
                ["Bold visions", stats.total],
                ["Realized", stats.realized],
                ["In progress", stats.partial],
                ["Still emerging", stats.emerging],
              ].map(([label, value], index) => (
                <div
                  key={String(label)}
                  className={`flex min-h-40 flex-col justify-between p-6 sm:p-8 ${index % 2 === 0 ? "border-r border-foreground/10" : ""} ${index < 2 ? "border-b border-foreground/10" : ""}`}
                >
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
                  <span className="brand-emerald font-serif text-5xl">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10 bg-card">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-5 py-5 sm:px-8 md:px-12 lg:flex-row lg:items-center lg:px-14 xl:px-20">
            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              Filter archive
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="h-9 w-32 rounded-none bg-background text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-9 w-48 rounded-none bg-background text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="h-9 w-40 rounded-none bg-background text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                  <SelectItem value="exceeded">Exceeded</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-xs text-muted-foreground lg:ml-auto">
              Showing {filteredPredictions.length} of {predictions.length}
            </span>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] border-x border-foreground/10">
          {filteredPredictions.length ? (
            filteredPredictions.map((prediction) => (
              <TimelineCard key={prediction.id} prediction={prediction} currentYear={currentYear} />
            ))
          ) : (
            <div className="px-5 py-16 text-center">
              <p className="font-serif text-2xl">No predictions match those filters.</p>
              <Button
                variant="outline"
                className="mt-5 rounded-none bg-transparent"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedYear("all");
                  setSelectedStatus("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </section>

        <section className="border-t border-foreground/10 bg-foreground text-background">
          <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[0.62fr_1.38fr]">
            <div className="border-b border-background/15 px-5 py-14 sm:px-8 md:px-12 lg:border-b-0 lg:border-r lg:px-14 lg:py-20 xl:px-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">Archive note</p>
              <h2 className="mt-5 font-serif text-4xl tracking-[-0.03em]">What the timeline teaches.</h2>
            </div>
            <div className="grid md:grid-cols-2">
              {[
                ["Direction mattered more than dates", "Researchers often missed the timeline while correctly identifying the capabilities that would eventually become foundational."],
                ["Methods changed", "Symbolic systems, neural networks, GPUs, internet-scale data, and new model architectures changed the route without erasing the original ambition."],
                ["Canada was part of the conversation early", "These publications preserve a record of Canadian institutions and researchers thinking seriously about intelligent systems decades before the current AI wave."],
                ["Archives create product context", "Looking backward makes the present less magical: today's systems sit on a long chain of ideas, experiments, failed approaches, and renewed bets."],
              ].map(([title, text], index) => (
                <div key={title} className={`p-6 sm:p-8 ${index % 2 === 0 ? "md:border-r md:border-background/15" : ""} ${index < 2 ? "border-b border-background/15" : ""}`}>
                  <h3 className="font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-background/65">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
