export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'web' | 'iot' | 'ai';
  categoryLabel: string;
  period: string;
  summary: string;
  description: string;
  highlights: string[];
  techStack: string[];
  featured: boolean;
  demoType?: 'surveillance' | 'radar' | 'code-analyzer' | 'blind-stick' | 'dashboard' | 'interrogation' | 'tracking';
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  category: 'work' | 'projects' | 'community';
  bulletPoints: string[];
  skillsUsed: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    tag: string;
  }[];
}
