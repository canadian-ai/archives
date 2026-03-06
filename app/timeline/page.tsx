"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Filter, ChevronDown, ChevronUp, Sparkles, Target, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  predictions,
  categories,
  years,
  getStatusColor,
  getStatusBgColor,
  getStatusLabel,
  type PredictionStatus,
  type PredictionCategory,
  type Prediction,
} from "@/lib/timeline-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function TimelineCard({ prediction, currentYear }: { prediction: Prediction; currentYear: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const yearsAgo = currentYear - prediction.year

  const statusIcon = {
    fulfilled: <CheckCircle2 className="w-4 h-4" />,
    exceeded: <Sparkles className="w-4 h-4" />,
    partial: <Clock className="w-4 h-4" />,
    unfulfilled: <AlertCircle className="w-4 h-4" />,
  }

  return (
    <div className="relative pl-8 pb-12 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[11px] top-2 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>

      {/* Card */}
      <div
        className={`glass-card rounded-xl p-6 transition-all duration-300 cursor-pointer hover:border-primary/30 ${
          isExpanded ? "border-primary/40" : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-primary font-mono text-sm">{prediction.year}</span>
              <span className="text-muted-foreground text-xs">({yearsAgo} years ago)</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{prediction.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                {prediction.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {prediction.scope}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusBgColor(
                prediction.status
              )} ${getStatusColor(prediction.status)}`}
            >
              {statusIcon[prediction.status]}
              {getStatusLabel(prediction.status)}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Prediction text (always visible) */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Target className="w-4 h-4" />
            <span>Original Prediction</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{prediction.prediction}</p>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Outcome as of {currentYear}</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">{prediction.outcome}</p>
            <div className="text-xs text-muted-foreground">
              Source: {prediction.source}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatsCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="glass-card rounded-xl p-4 text-center">
      <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

export default function TimelinePage() {
  const currentYear = new Date().getFullYear()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredPredictions = useMemo(() => {
    return predictions.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false
      if (selectedYear !== "all" && p.year !== parseInt(selectedYear)) return false
      if (selectedStatus !== "all" && p.status !== selectedStatus) return false
      return true
    })
  }, [selectedCategory, selectedYear, selectedStatus])

  const stats = useMemo(() => {
    const fulfilled = predictions.filter((p) => p.status === "fulfilled" || p.status === "exceeded").length
    const partial = predictions.filter((p) => p.status === "partial").length
    const unfulfilled = predictions.filter((p) => p.status === "unfulfilled").length
    return { fulfilled, partial, unfulfilled, total: predictions.length }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 grid-bg-animated pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Archive</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Viewing from {currentYear}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1">
              Historical Analysis
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              <span className="gradient-text">Evolution of AI Predictions</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              A retrospective look at AI predictions made in Canadian AI publications from 1984 to 1991,
              examined through the lens of {currentYear}.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <StatsCard label="Total Predictions" value={stats.total} color="text-foreground" />
              <StatsCard label="Fulfilled" value={stats.fulfilled} color="text-emerald-400" />
              <StatsCard label="Partial" value={stats.partial} color="text-amber-400" />
              <StatsCard label="Unfulfilled" value={stats.unfulfilled} color="text-rose-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative z-10 py-6 border-y border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32 h-9 text-sm">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 h-9 text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40 h-9 text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:ml-auto text-sm text-muted-foreground">
              Showing {filteredPredictions.length} of {predictions.length} predictions
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {filteredPredictions.length > 0 ? (
              filteredPredictions.map((prediction) => (
                <TimelineCard key={prediction.id} prediction={prediction} currentYear={currentYear} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No predictions match your filters.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSelectedYear("all")
                    setSelectedStatus("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="relative z-10 py-12 md:py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Key Insights</h2>
            <div className="grid gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold mb-3 text-primary">The Timing Problem, Not the Vision Problem</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The 1980s AI community was largely right about what would happen — they were wrong about when.
                  Most predictions weren't failures of imagination; they were failures of forecasting the hardware
                  and data requirements needed to get there. Self-driving vehicles, medical AI, speech recognition,
                  and machine translation all exist today. The predictions were off by 15–25 years, not fundamentally wrong.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold mb-3 text-primary">The Paradigm Shift Nobody Saw Coming</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The clearest blind spot was methodological. Virtually every prediction assumed logic-based,
                  symbolic AI would be the path forward. Almost none anticipated that statistical learning — and
                  eventually deep learning — would make the breakthroughs that symbolic AI never could. This wasn't
                  just a wrong prediction; it was a wrong worldview that shaped the entire field's direction through
                  the late 1980s and contributed to the second AI winter.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold mb-3 text-primary">The Classification Here Undersells Progress</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Several predictions marked "Unfulfilled" or "Partially Fulfilled" deserve a second look. Neural
                  networks didn't partially succeed — they became the foundation of a trillion-dollar industry.
                  Speech recognition didn't partially arrive — it's in every smartphone. Machine translation is
                  woven into the global internet. The bar for "fulfilled" here seems to be perfection, which isn't
                  a fair standard for 40-year-old predictions.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold mb-3 text-primary">The One Lesson Worth Carrying Forward</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The researchers of the 1980s were overconfident about timelines and blind to paradigm shifts.
                  Anyone making AI predictions today should ask: what assumption are we so confident in that we're
                  not even questioning it?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Data sourced from Canadian AI publications, 1984-1991.</p>
          <p className="mt-2">Analysis current as of {currentYear}.</p>
        </div>
      </footer>
    </div>
  )
}
