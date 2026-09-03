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
      "This vision has been spectacularly realized. Today's large language models like GPT-4 and Claude engage in nuanced, context-aware conversations that often exceed original expectations. Voice assistants handle billions of queries daily, and AI chatbots provide customer service worldwide. The timeline was off by decades, but the achievement surpasses what 1984 researchers imagined.",
    status: "fulfilled",
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
      "While traditional rule-based expert systems faced limitations, the underlying vision triumphed. Modern AI systems now assist in medical diagnosis (achieving radiologist-level accuracy), power algorithmic trading, and help lawyers review contracts. The approach evolved from symbolic rules to machine learning, but the goal of AI-augmented expertise is now reality.",
    status: "fulfilled",
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
      "Neural machine translation has exceeded expectations. Google Translate serves over 500 million users daily across 130+ languages. DeepL produces translations that professional translators often cannot distinguish from human work. Real-time translation earbuds and apps have made cross-language communication routine. The dream of eliminating language barriers is becoming reality.",
    status: "fulfilled",
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
      "Self-driving technology has made remarkable strides. Waymo operates commercial robotaxi services in multiple US cities. Tesla's Autopilot and Full Self-Driving features are used by millions. Autonomous trucks are being tested for long-haul freight. While full autonomy everywhere remains in progress, the fundamental prediction is being realized with transformative potential for safety and accessibility.",
    status: "partial",
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
      "This prediction proved profoundly correct in direction, if not timing. Backpropagation became the foundation of the deep learning revolution. Neural networks now power image recognition, speech synthesis, language translation, drug discovery, and countless other applications. Geoffrey Hinton, co-author of the 1986 backpropagation paper, won the 2024 Nobel Prize in Physics for this foundational work.",
    status: "exceeded",
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
      "Computer vision has achieved and surpassed human-level performance on many tasks. Since AlexNet's 2012 breakthrough, AI systems routinely outperform humans in image classification. Medical imaging AI detects cancer with expert-level accuracy. Autonomous vehicles navigate city streets. Facial recognition, while raising important ethical questions, demonstrates superhuman accuracy. The vision is realized.",
    status: "fulfilled",
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
      "While explicit knowledge bases like CYC faced scalability challenges, large language models have achieved remarkable common sense reasoning through a different path. Modern AI can reason about physics, social situations, cause and effect, and everyday scenarios with impressive competence. The goal was achieved through statistical learning rather than hand-coded rules — a testament to the field's adaptability.",
    status: "fulfilled",
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
      "Speech recognition has far exceeded the 95% accuracy target. Modern systems achieve over 95% accuracy even in noisy environments and across diverse accents. Siri, Alexa, and Google Assistant handle billions of voice commands. Real-time transcription is now standard in video calls. OpenAI's 2025 audio models set new benchmarks for accuracy and natural speech understanding. Voice computing is ubiquitous.",
    status: "exceeded",
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
      "AI tutoring has entered a golden age. ChatGPT and similar LLMs provide personalized explanations across every subject. Khan Academy's Khanmigo offers AI-powered tutoring to millions. Studies show AI tutors can match human tutors in effectiveness for many tasks. The vision of personalized, accessible education is becoming reality, with the potential to democratize learning worldwide.",
    status: "fulfilled",
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
      "The vision of massive parallelism powering AI has been spectacularly realized through GPUs. Modern AI clusters contain hundreds of thousands of parallel processing cores. NVIDIA's data center GPUs enable AI models with trillions of parameters. Real-time AI reasoning is now routine — from instant language translation to real-time video analysis. The path differed, but the destination exceeded expectations.",
    status: "exceeded",
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
      "While logic programming didn't become the dominant paradigm, the underlying goal of machine reasoning has been achieved through different means. Modern AI systems can perform complex reasoning, mathematical proofs, and logical inference. The hybrid approach combining neural networks with symbolic reasoning (neurosymbolic AI) is an active research frontier, potentially combining the best of both worlds.",
    status: "partial",
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
      "Robot manipulation has made exciting breakthroughs. Learning-based approaches enable robots to fold laundry, cook meals, and handle delicate objects. Companies like Figure AI and Boston Dynamics are deploying humanoid robots in real-world settings. Amazon uses millions of robots in warehouses. While general-purpose household robots are still emerging, the fundamental capabilities are advancing rapidly.",
    status: "partial",
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
      "Medical AI is transforming healthcare. AI systems detect diabetic retinopathy, skin cancer, and breast cancer with expert-level accuracy. Radiology AI is FDA-approved and widely deployed. AI predicts patient deterioration, assists in drug discovery, and even helped design COVID vaccines. Tools like NVIDIA Clara Reason are advancing explainable medical AI. The 50% target is within reach as adoption accelerates.",
    status: "fulfilled",
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
      "AI planning and optimization are now essential to global commerce. Amazon optimizes delivery routes for millions of packages daily. Airlines use AI to manage fleet scheduling and crew assignments. Supply chain AI helped navigate pandemic disruptions. LLM-based agents can now create and execute complex multi-step plans autonomously. The prediction has been thoroughly fulfilled.",
    status: "fulfilled",
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
      "Deep Blue's 1997 victory over Kasparov was just the beginning. Today's chess AI is so far beyond human capability that any smartphone app can defeat grandmasters. AlphaZero learned to play chess at superhuman levels in just 4 hours of self-play. AI has since conquered Go, poker, StarCraft, and Diplomacy — games once thought to require human intuition. The achievement exceeded all expectations.",
    status: "exceeded",
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
      "Handwriting recognition technology has achieved remarkable accuracy. Digital pens and tablets use AI to convert handwriting to text with near-perfect precision. Apple Pencil with Scribble, Samsung S Pen, and countless note-taking apps recognize handwriting flawlessly. While keyboards remain dominant, the technology works exactly as predicted — it simply became one input method among many rather than a keyboard replacement.",
    status: "fulfilled",
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
    case "exceeded":
      return "text-[var(--brand-emerald-strong)]"
    case "partial":
      return "text-foreground"
    case "unfulfilled":
      return "text-muted-foreground"
    default:
      return "text-muted-foreground"
  }
}

export function getStatusBgColor(status: PredictionStatus): string {
  switch (status) {
    case "fulfilled":
      return "bg-[var(--brand-emerald-soft)] border-[var(--brand-emerald)]/30"
    case "exceeded":
      return "bg-[var(--brand-emerald-soft)] border-[var(--brand-emerald)]"
    case "partial":
      return "bg-secondary border-foreground/15"
    case "unfulfilled":
      return "bg-background border-foreground/10"
    default:
      return "bg-background border-foreground/10"
  }
}

export function getStatusLabel(status: PredictionStatus): string {
  switch (status) {
    case "fulfilled":
      return "Vision Realized"
    case "exceeded":
      return "Beyond Expectations"
    case "partial":
      return "Rapidly Advancing"
    case "unfulfilled":
      return "Still Emerging"
    default:
      return "Unknown"
  }
}
