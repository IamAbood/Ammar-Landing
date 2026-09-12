// Single source of truth for all site copy.
// To add a project: append one object to the `projects` array below —
// a card on the grid and a /projects/<slug> detail page are generated automatically.

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  cvUrl: string;
}

export interface ExperienceEntry {
  company: string;
  companyNative?: string;
  title: string;
  dates: string;
  description: string;
  tech: string[];
}

export interface ProjectLinks {
  appStore?: string;
  github?: string;
  live?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface About {
  bio: string;
  skillGroups: SkillGroup[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  description: string;
  highlights: string[];
  tech: string[];
  screenshots: string[];
  links: ProjectLinks;
}

export const profile: Profile = {
  name: "TODO_FULL_NAME",
  role: "iOS & Mobile Developer",
  tagline: "I build native iOS apps and the backends behind them.",
  email: "TODO_EMAIL",
  github: "TODO_GITHUB_URL",
  linkedin: "TODO_LINKEDIN_URL",
  location: "Amman, Jordan",
  cvUrl: "/cv.pdf",
};

export const about: About = {
  bio: "iOS & Mobile Developer based in Amman, Jordan. I build native iOS apps and the backends behind them — from Swift/UIKit e-commerce storefronts to ASP.NET services and data-heavy cross-platform apps.",
  skillGroups: [
    { label: "Mobile", items: ["Swift", "UIKit", "SwiftUI", "MVVM", "Coordinator", "Xcode"] },
    { label: "Backend & APIs", items: ["ASP.NET", "C#", "REST API", "SQL", "Postman"] },
    { label: "Tools & Integrations", items: ["Git", "GitHub", "Firebase", "OneSignal"] },
  ],
};

export const experience: ExperienceEntry[] = [
  {
    company: "Blue Ray for Web Solutions",
    title: "iOS Developer",
    dates: "TODO_DATES",
    description:
      "Developed, optimized and maintained 10+ native iOS e-commerce apps covering product discovery through secure checkout. Built product listings, cart management and real-time order tracking in Swift/UIKit. Structured codebases with MVVM + Coordinator. Integrated REST APIs with JSON parsing, verified endpoints in Postman, and integrated OneSignal push notifications. Managed Git/GitHub workflow, resolved merge conflicts, and reviewed PRs.",
    tech: ["Swift", "UIKit", "MVVM", "Coordinator", "REST", "Postman", "OneSignal", "Git"],
  },
  {
    company: "Al-Awael Technology",
    companyNative: "الأوائل تكنولوجي",
    title: "Full-Stack Developer",
    dates: "TODO_DATES",
    description:
      "Worked across three projects including Cash Van and Cash Van Admin. Built and maintained RESTful APIs in ASP.NET, handled system integration, and connected backend services to both mobile and web front ends. Owned features end to end.",
    tech: ["ASP.NET", "C#", "REST API", "SQL", "TODO_FRONTEND_STACK"],
  },
  {
    company: "Smart Steps Software",
    title: "Mobile Developer",
    dates: "TODO_DATES",
    description:
      "Built the Ma'an app from scratch (~10 screens, heavy API traffic, large datasets) and maintained and improved the Kitchens app. Focused on API integration, state management and responsive UI.",
    tech: ["TODO_STACK", "REST API", "State Management"],
  },
  {
    company: "iHorizons",
    title: "iOS Development Trainee",
    dates: "TODO_DATES",
    description:
      "Hands-on iOS training at an enterprise IT solution provider. Built a full project combining UIKit and SwiftUI, worked with Swift fundamentals and protocols, and integrated REST APIs, Firebase and third-party services.",
    tech: ["Swift", "UIKit", "SwiftUI", "Firebase", "Xcode"],
  },
];

export const projects: Project[] = [
  {
    slug: "cash-van",
    title: "Cash Van",
    subtitle: "field sales & distribution mobile app",
    year: "TODO_YEAR",
    role: "Full-Stack Developer",
    description:
      "Built and maintained RESTful APIs in ASP.NET for a field sales and distribution mobile app, handling system integration and connecting backend services to the mobile front end.",
    highlights: [
      "Built and maintained RESTful APIs in ASP.NET",
      "Handled system integration between mobile and backend services",
      "Owned features end to end",
    ],
    tech: ["ASP.NET", "C#", "REST API", "SQL", "TODO_FRONTEND_STACK"],
    screenshots: [],
    links: {},
  },
  {
    slug: "cash-van-admin",
    title: "Cash Van Admin",
    subtitle: "web dashboard for the Cash Van system",
    year: "TODO_YEAR",
    role: "Full-Stack Developer",
    description:
      "Web dashboard companion to the Cash Van mobile app. Built and maintained RESTful APIs in ASP.NET and connected backend services to the web front end.",
    highlights: [
      "Built and maintained RESTful APIs in ASP.NET",
      "Connected backend services to the web front end",
      "Owned features end to end",
    ],
    tech: ["ASP.NET", "C#", "REST API", "SQL", "TODO_FRONTEND_STACK"],
    screenshots: [],
    links: {},
  },
  {
    slug: "maan",
    title: "Ma'an",
    subtitle: "data-heavy mobile app, ~10 screens",
    year: "TODO_YEAR",
    role: "Mobile Developer",
    description:
      "Built from scratch: a mobile app with roughly 10 screens, heavy API traffic and large datasets. Focused on API integration, state management and responsive UI.",
    highlights: [
      "Built the app from scratch across ~10 screens",
      "Handled heavy API traffic and large datasets",
      "Focused on API integration, state management and responsive UI",
    ],
    tech: ["TODO_STACK", "REST API", "State Management"],
    screenshots: [],
    links: {},
  },
  {
    slug: "kitchens",
    title: "Kitchens",
    subtitle: "maintained and improved existing mobile app",
    year: "TODO_YEAR",
    role: "Mobile Developer",
    description:
      "Maintained and improved an existing mobile app, focused on API integration, state management and responsive UI.",
    highlights: [
      "Maintained and improved an existing production app",
      "Focused on API integration, state management and responsive UI",
    ],
    tech: ["TODO_STACK", "REST API", "State Management"],
    screenshots: [],
    links: {},
  },
  {
    slug: "ecommerce-suite",
    title: "iOS E-Commerce Suite",
    subtitle: "10+ shipped native storefront apps",
    year: "TODO_YEAR",
    role: "iOS Developer",
    description:
      "Developed, optimized and maintained 10+ native iOS e-commerce apps covering product discovery through secure checkout. Built product listings, cart management and real-time order tracking in Swift/UIKit, structured with MVVM + Coordinator.",
    highlights: [
      "Shipped 10+ native iOS e-commerce apps",
      "Built product listings, cart management and real-time order tracking",
      "Structured codebases with MVVM + Coordinator",
      "Integrated REST APIs, Postman-verified endpoints, and OneSignal push notifications",
    ],
    tech: ["Swift", "UIKit", "MVVM", "Coordinator", "REST", "Postman", "OneSignal", "Git"],
    screenshots: [],
    links: {},
  },
];
