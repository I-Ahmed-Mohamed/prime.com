export interface Project {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  category: 'all' | 'fullstack' | 'backend' | 'angular' | 'enterprise';
  tags: string[];
  backendStack: string[];
  frontendStack: string[];
  architecture: string;
  image: string;
  client?: string;
  clientAr?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: { label: string; labelAr: string; value: string }[];
}

export interface ClientPartner {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  logo: string;
  description: string;
  descriptionAr: string;
  deliverables: string[];
  deliverablesAr: string[];
  link?: string;
  facebookUrl?: string;
  badge: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  features: string[];
  featuresAr: string[];
  techStack: string[];
  badge?: string;
}

export interface SkillCategory {
  title: string;
  titleAr: string;
  icon: string;
  badge: string;
  skills: {
    name: string;
    level: number;
    experience: string;
    icon: string;
    popular?: boolean;
  }[];
}

export interface AiSkillPillar {
  id: string;
  category: string;
  categoryAr: string;
  icon: string;
  badge: string;
  badgeAr: string;
  summary: string;
  summaryAr: string;
  technologies: {
    name: string;
    proficiency: number;
    experience: string;
    tag: string;
    highlight?: boolean;
    useCaseAr: string;
    useCaseEn: string;
  }[];
}

export interface PricingTier {
  id: string;
  name: string;
  nameAr: string;
  badge: string;
  badgeAr: string;
  priceEgp: string;
  priceUsd: string;
  deliveryTime: string;
  deliveryTimeAr: string;
  description: string;
  descriptionAr: string;
  features: string[];
  featuresAr: string[];
  popular: boolean;
  actionText: string;
  actionTextAr: string;
  whatsappMessage: string;
}

export interface PaymentChannel {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  icon: string;
  accentColor: string;
  accountNumber?: string;
  accountName?: string;
  iban?: string;
  bankName?: string;
  bankNameAr?: string;
  instapayUsername?: string;
  badge: string;
  badgeAr: string;
  instructions: string;
  instructionsAr: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  suggestions?: string[];
  actionLink?: {
    text: string;
    url: string;
  };
}
