export interface NavLink {
  label: string;
  href: string;
}

export interface Metric {
  id: number;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  details: string[];
  image: string;
  accentColor: string;
  monoText: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  category: string;
  image: string;
  span?: 'full' | 'third';
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  email: string;
  location: string;
  nav: NavLink[];
  socials: SocialLink[];
  hero: {
    status: {
      label: string;
      value: string;
    };
    headline: {
      prefix: string;
      highlight: string;
    };
    subheadline: string;
    description: string;
  };
  metrics: Metric[];
  workflow: {
    title: string;
    subtitle: string;
    steps: WorkflowStep[];
  };
  caseStudies: {
    title: string;
    subtitle: string;
    items: CaseStudy[];
  };
  testimonials: {
    title: string;
    highlight: string;
    items: Testimonial[];
  };
  cta: {
    headline: string;
    highlight: string;
    description: string;
    buttonText: string;
  };
  contact: {
    title: string;
    description: string;
  };
}
