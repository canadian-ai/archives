export type PredictionStatus = "fulfilled" | "partial" | "unfulfilled" | "exceeded"

export type PredictionCategory =
  | "Natural Language Processing"
  | "Expert Systems"
  | "Machine Learning"
  | "Robotics"
  | "Computer Vision"
  | "Knowledge Representation"
  | "General AI"

export interface Prediction {
  id: string
  year: number
  title: string
  prediction: string
  outcome: string
  status: PredictionStatus
  category: PredictionCategory
  source: string
  scope: "Canadian" | "Global"
}

export const predictions: Prediction[] = [
  {
    id: "1984-nlp-understanding",
    year: 1984,
    title: "Natural Language Understanding",
    prediction:
      "By 1990, computers will be able to understand and respond to natural language queries with human-like comprehension, enabling seamless human-computer dialogue.",
    outcome:
      "Early NLP systems like SHRDLU showed promise but were limited to narrow domains. True natural language understanding remained elusive until the transformer revolution decades later.",
    status: "unfulfilled",
    category: "Natural Language Processing",
    source: "Canadian AI Conference 1984",
    scope: "Global",
  },
  {
    id: "1984-expert-systems",
    year: 1984,
    title: "Expert Systems Proliferation",
    prediction:
      "Expert systems will become ubiquitous in business decision-making by 1989, replacing human experts in medical diagnosis, financial planning, and legal reasoning.",
    outcome:
      "Expert systems saw significant adoption (MYCIN, DENDRAL) but maintenance costs and brittleness limited widespread deployment. The AI Winter of the late 1980s dampened enthusiasm.",
    status: "partial",
    category: "Expert Systems",
    source: "NRC AI Symposium 1984",
    scope: "Canadian",
  },
  {
    id: "1985-machine-translation",
    year: 1985,
    title: "Automated Translation",
    prediction:
      "Machine translation will achieve near-human quality by 1995, eliminating language barriers in international business and diplomacy.",
    outcome:
      "Rule-based systems produced stilted translations. Statistical methods improved results, but neural machine translation only achieved near-human quality after 2016 with attention mechanisms.",
    status: "unfulfilled",
    category: "Natural Language Processing",
    source: "Canadian AI Conference 1985",
    scope: "Global",
  },
  {
    id: "1985-autonomous-vehicles",
    year: 1985,
    title: "Self-Driving Vehicles",
    prediction:
      "Autonomous vehicles will be commercially available by 2000, transforming transportation and eliminating human error in driving.",
    outcome:
      "Despite early demos like Carnegie Mellon's Navlab, self-driving cars remained experimental. Commercial deployment only began in the 2020s and remains limited.",
    status: "unfulfilled",
    category: "Robotics",
    source: "Canadian Robotics Conference 1985",
    scope: "Global",
  },
  {
    id: "1986-neural-networks",
    year: 1986,
    title: "Neural Network Renaissance",
    prediction:
      "Backpropagation will enable neural networks to solve complex pattern recognition problems, leading to practical applications within 5 years.",
    outcome:
      "Backpropagation (Rumelhart, Hinton, Williams 1986) did revive neural networks, but computational limitations delayed widespread practical applications until the deep learning era of 2012+.",
    status: "partial",
    category: "Machine Learning",
    source: "Canadian AI Conference 1986",
    scope: "Global",
  },
  {
    id: "1986-computer-vision",
    year: 1986,
    title: "Machine Vision Systems",
    prediction:
      "Computer vision systems will match human visual recognition capabilities by 1995, enabling robots to navigate complex environments autonomously.",
    outcome:
      "Computer vision progressed slowly with hand-crafted features. Human-level image recognition was only achieved with CNNs in 2015 (ImageNet), decades behind prediction.",
    status: "unfulfilled",
    category: "Computer Vision",
    source: "NRC Vision Workshop 1986",
    scope: "Canadian",
  },
  {
    id: "1987-knowledge-bases",
    year: 1987,
    title: "Common Sense Knowledge",
    prediction:
      "Comprehensive common sense knowledge bases will be developed by 1997, enabling AI systems to reason about everyday situations like humans.",
    outcome:
      "Projects like CYC attempted this but the scope proved immense. Modern LLMs achieve apparent common sense through statistical patterns rather than explicit knowledge bases.",
    status: "partial",
    category: "Knowledge Representation",
    source: "Canadian AI Conference 1987",
    scope: "Global",
  },
  {
    id: "1987-speech-recognition",
    year: 1987,
    title: "Continuous Speech Recognition",
    prediction:
      "Continuous speech recognition with 95%+ accuracy will be available for general use by 1995, enabling voice-controlled computing.",
    outcome:
      "Dragon NaturallySpeaking (1997) achieved good results for dictation. General-purpose, high-accuracy speech recognition came with deep learning systems like Google's in 2012.",
    status: "partial",
    category: "Natural Language Processing",
    source: "Canadian Speech Processing Symposium 1987",
    scope: "Canadian",
  },
  {
    id: "1988-intelligent-tutoring",
    year: 1988,
    title: "Intelligent Tutoring Systems",
    prediction:
      "AI tutoring systems will provide personalized education rivaling human tutors by 1998, revolutionizing classroom learning.",
    outcome:
      "Early ITS showed promise in specific domains but lacked adaptability. Modern AI tutoring is only now approaching this vision with LLM-based systems.",
    status: "unfulfilled",
    category: "Expert Systems",
    source: "Canadian Educational Computing Conference 1988",
    scope: "Canadian",
  },
  {
    id: "1988-parallel-processing",
    year: 1988,
    title: "Massively Parallel AI",
    prediction:
      "Massively parallel computing will enable real-time AI reasoning at human scale by 1995, with connection machines hosting millions of processors.",
    outcome:
      "Connection machines proved limited. GPU computing eventually fulfilled this vision, but not until NVIDIA's CUDA (2006) and deep learning applications (2012+).",
    status: "partial",
    category: "General AI",
    source: "Canadian AI Conference 1988",
    scope: "Global",
  },
  {
    id: "1989-logic-programming",
    year: 1989,
    title: "Fifth Generation Computing",
    prediction:
      "Logic programming and parallel inference machines will dominate AI by 1995, with Prolog-based systems handling complex reasoning tasks.",
    outcome:
      "Japan's Fifth Generation project ended in 1992 without achieving goals. Statistical and neural approaches ultimately proved more successful than logic-based AI.",
    status: "unfulfilled",
    category: "Knowledge Representation",
    source: "Canadian Logic Programming Conference 1989",
    scope: "Global",
  },
  {
    id: "1989-robotics-manipulation",
    year: 1989,
    title: "Dexterous Robot Manipulation",
    prediction:
      "Robots will achieve human-like dexterity in manipulation tasks by 2000, enabling general-purpose household robots.",
    outcome:
      "Industrial robots excel at repetitive tasks but general manipulation remains challenging. Recent advances in learning-based approaches show promise but household robots are still limited.",
    status: "unfulfilled",
    category: "Robotics",
    source: "Canadian Robotics Conference 1989",
    scope: "Global",
  },
  {
    id: "1990-medical-diagnosis",
    year: 1990,
    title: "AI Medical Diagnosis",
    prediction:
      "AI systems will assist in 50% of medical diagnoses by 2000, reducing diagnostic errors and improving patient outcomes.",
    outcome:
      "Medical AI adoption was slow due to liability concerns and integration challenges. Significant diagnostic AI deployment only began in the 2010s with deep learning for imaging.",
    status: "unfulfilled",
    category: "Expert Systems",
    source: "Canadian Medical Informatics Conference 1990",
    scope: "Canadian",
  },
  {
    id: "1990-planning-systems",
    year: 1990,
    title: "Autonomous Planning",
    prediction:
      "AI planning systems will manage complex logistics and scheduling for major corporations by 1997, outperforming human planners.",
    outcome:
      "Planning systems found niche applications in airline scheduling and manufacturing. Broader adoption came with constraint satisfaction and optimization advances.",
    status: "partial",
    category: "General AI",
    source: "Canadian AI Conference 1990",
    scope: "Canadian",
  },
  {
    id: "1991-chess-mastery",
    year: 1991,
    title: "Chess World Champion AI",
    prediction:
      "A computer will defeat the world chess champion by 1998, demonstrating superhuman strategic reasoning.",
    outcome:
      "Deep Blue defeated Garry Kasparov in 1997, closely matching the prediction. This remains one of the most accurate AI predictions from this era.",
    status: "fulfilled",
    category: "General AI",
    source: "Canadian AI Conference 1991",
    scope: "Global",
  },
  {
    id: "1991-handwriting-recognition",
    year: 1991,
    title: "Handwriting Recognition",
    prediction:
      "Handwriting recognition will achieve 99% accuracy by 1996, enabling pen-based computing to replace keyboards.",
    outcome:
      "Newton and Palm showed promise but accuracy issues frustrated users. Modern touchscreen devices largely bypassed handwriting in favor of virtual keyboards and voice.",
    status: "partial",
    category: "Computer Vision",
    source: "Canadian Pattern Recognition Conference 1991",
    scope: "Global",
  },
]

export const categories: PredictionCategory[] = [
  "Natural Language Processing",
  "Expert Systems",
  "Machine Learning",
  "Robotics",
  "Computer Vision",
  "Knowledge Representation",
  "General AI",
]

export const years = [1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991]

export function getStatusColor(status: PredictionStatus): string {
  switch (status) {
    case "fulfilled":
      return "text-emerald-400"
    case "exceeded":
      return "text-cyan-400"
    case "partial":
      return "text-amber-400"
    case "unfulfilled":
      return "text-rose-400"
    default:
      return "text-muted-foreground"
  }
}

export function getStatusBgColor(status: PredictionStatus): string {
  switch (status) {
    case "fulfilled":
      return "bg-emerald-500/20 border-emerald-500/30"
    case "exceeded":
      return "bg-cyan-500/20 border-cyan-500/30"
    case "partial":
      return "bg-amber-500/20 border-amber-500/30"
    case "unfulfilled":
      return "bg-rose-500/20 border-rose-500/30"
    default:
      return "bg-muted/20 border-muted/30"
  }
}

export function getStatusLabel(status: PredictionStatus): string {
  switch (status) {
    case "fulfilled":
      return "Fulfilled"
    case "exceeded":
      return "Exceeded"
    case "partial":
      return "Partially Fulfilled"
    case "unfulfilled":
      return "Unfulfilled"
    default:
      return "Unknown"
  }
}
