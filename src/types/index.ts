export interface QuestionData {
  content: string;
}

export interface CategoryData {
  icon: string;
  color: string;
  questions: Record<string, QuestionData>;
}

export interface QAData {
  [category: string]: CategoryData;
}

export interface MutualLink {
  name: string;
  url: string;
  banner: string;
  description?: string;
}

export interface TakoInstance {
  id: number;
}

export interface SkillData {
  title: string;
  text: string;
  icon: string;
  color: string;
  level: number;
}
