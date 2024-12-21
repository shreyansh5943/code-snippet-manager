export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  tags: string[];
  code: string;
  dateCreated: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface SearchParams {
  query: string;
  category?: string;
  tag?: string;
}