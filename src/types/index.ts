export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface Note {
  id: string;
  question: string;
  answer: string;
  category: 'react' | 'nodejs' | 'mobileapp' | 'code';
  code?: string;
  createdAt: string;
}

export interface FeedbackData {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
