export const name = "Sujeel Marapatla";

export const role = "CSE Student & Full-Stack Developer";

export const hero = {
  title: "CS student building AI-powered products",
  subtitle:
    "I design and build software that is useful, delightful, and scalable, with a focus on machine learning applications.",
  cta1: "View Projects",
  cta2: "Contact Me",
};

export const about = [
  "I am a Computer Science student at MLR Institute of Technology, specializing in AI & Machine Learning. My passion lies at the intersection of full-stack web development, intuitive UI/UX design, and the transformative potential of artificial intelligence.",
  "I focus on shipping real-world products, not just completing coursework. From an AI-powered edtech platform that simplifies university applications to a real-time queue management system for hospitals, I enjoy tackling complex problems and delivering tangible solutions.",
  "Currently, I'm deepening my expertise in machine learning, exploring how to build more intelligent and personalized user experiences. I'm always eager to learn new technologies and apply them to create meaningful impact.",
];

export const skillCategories = [
  {
    category: "Languages",
    subtitle: "Core Programming & Algorithms",
    badgeColor: "bg-[#ff3b11] text-white",
    items: [
      {
        name: "C",
        description: "Low-level system fundamentals, pointers, memory allocation, and foundational data structures.",
      },
      {
        name: "Java",
        description: "Robust object-oriented programming, enterprise backend logic, and algorithmic problem solving.",
      },
      {
        name: "Python",
        description: "Primary language for AI/ML modeling, FastAPI development, data manipulation, and automation.",
      },
    ],
  },
  {
    category: "Databases",
    subtitle: "Data Management & Architecture",
    badgeColor: "bg-[#7c3aed] text-white",
    items: [
      {
        name: "SQL",
        description: "Relational database querying, multi-table joins, indexing, and complex data retrieval.",
      },
      {
        name: "DBMS",
        description: "Database normalization, transaction management (ACID), schema design, and data integrity.",
      },
    ],
  },
  {
    category: "AI & Machine Learning",
    subtitle: "Current Focus & Specialization",
    badgeColor: "bg-[#06b6d4] text-white",
    items: [
      {
        name: "AI/ML Modeling",
        description: "Supervised and unsupervised learning, predictive analytics, neural networks, and model integration.",
      },
      {
        name: "Prompt & LLM Workflows",
        description: "Integrating intelligent API pipelines, generative AI workflows, and smart context retrieval.",
      },
    ],
  },
  {
    category: "Tools & Frameworks",
    subtitle: "Modern Web & Developer Experience",
    badgeColor: "bg-[#ec4899] text-white",
    items: [
      {
        name: "Next.js & React",
        description: "Building fast, full-stack web applications with Server Components, SSR, and dynamic UI state.",
      },
      {
        name: "Git & GitHub",
        description: "Distributed version control, collaborative feature branching, code reviews, and CI/CD pipelines.",
      },
      {
        name: "Figma & VS Code",
        description: "UI/UX wireframing, design system prototyping, and streamlined developer workspace setups.",
      },
    ],
  },
];

export const skills = {
  languages: {
    title: "Languages",
    items: ["C", "Java", "Python"],
  },
  databases: {
    title: "Databases",
    items: ["SQL", "DBMS"],
  },
  learning: {
    title: "Currently Learning",
    items: ["AI/ML"],
  },
  tools: {
    title: "Tools",
    items: ["Git", "Figma", "VS Code", "Next.js"],
  },
};

export const projects = [
  {
    title: "OneProfile",
    description:
      "An AI-powered edtech platform for Class 11-12 students and entrance exam aspirants (JEE, EAPCET, BITSAT). Features a master profile and document vault that auto-fills over 50 different exam applications.",
    stack: ["Next.js", "FastAPI", "Python", "AI/ML"],
    codeUrl: "https://github.com/sujeelmarapatla-14AA/PortFolio",
    liveUrl: "#",
    image: "/oneprofile-screenshot.png",
  },
  {
    title: "CareQ",
    description:
      "A real-time hospital queue and bed management system implemented for a major hospital in Hyderabad. Includes role-based access control, live bed status tracking with Socket.io, and an analytics dashboard for administrators.",
    stack: ["Node.js", "Express", "Socket.io", "Chart.js"],
    codeUrl: "https://github.com/sujeelmarapatla-14AA/PortFolio",
    liveUrl: null,
    image: "/careq-screenshot.png",
  },
  {
    title: "PortFolio Web App",
    description:
      "A studio-grade developer portfolio featuring interactive React Bits 3D canvas physics, custom cursor animations, dark mode studio cards, and responsive glassmorphism.",
    stack: ["Next.js 16", "React 19", "Tailwind CSS", "GSAP"],
    codeUrl: "https://github.com/sujeelmarapatla-14AA/PortFolio",
    liveUrl: "https://github.com/sujeelmarapatla-14AA/PortFolio",
    image: "/hero-avatar.png",
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  image: string;
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    title: "AI Foundation Course",
    issuer: "JioPC & Jio Institute",
    date: "2026",
    image: "/certificates/ai-foundation.png",
    credentialUrl: "",
  },
  {
    title: "Innovation Practices using Autodesk - Fusion",
    issuer: "Design Labs - Autodesk Authorized Academic Partner",
    date: "March 2026",
    image: "/certificates/autodesk-fusion.jpg",
    credentialUrl: "",
  },
  {
    title: "Web Development - Workshop Carnival 2.0",
    issuer: "CIE - MLR Institute of Technology",
    date: "April 2026",
    image: "/certificates/web-dev-workshop.jpg",
    credentialUrl: "",
  },
  {
    title: "MongoDB Basics for Students",
    issuer: "MongoDB",
    date: "August 2026",
    image: "/certificates/mongodb-basics.jpg",
    credentialUrl: "https://www.credly.com/badges/e2a3e5af-3db9-43e7-b3f4-2aefae156214",
  },
];

export interface EducationItem {
  institution: string;
  degree: string;
  graduation: string;
}

export const educationList: EducationItem[] = [
  {
    institution: "MLR Institute of Technology, Hyderabad",
    degree: "B.Tech in CSE (CSM — AI & Machine Learning)",
    graduation: "2025 - 2029",
  },
  {
    institution: "Sri Chaitanya Junior College",
    degree: "Intermediate (MPC Course)",
    graduation: "2023 - 2025",
  },
  {
    institution: "Nava Jyothi High School",
    degree: "Schooling (SSC / Secondary Education)",
    graduation: "2018 - 2023",
  },
];

export const education = educationList[0];

export const contact = {
  email: "sujeelmarapatla@gmail.com",
  social: {
    github: "https://github.com/sujeelmarapatla-14AA",
    linkedin: "https://www.linkedin.com/in/sujeel-m-a2aa1a38a",
    instagram: "https://www.instagram.com/sujeel_14_?igsh=ejlmZXBoNjZqYm9p",
  },
};

export const footer = {
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  builtWith: "Built with Next.js and Tailwind CSS.",
};
