export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface Note {
  id: string;
  question: string;
  answer: string;
  category?: string;
  code?: string;
  createdAt?: string;
}

export interface FeedbackData {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface QuestionComponetProps {
  categoryType: string;
}

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export interface ICategory {
  categoryId: string ;
  categoryType: string ;
  description: string ;
  _id: string ;
}

export interface GLoader {
  loading: boolean;
}

export interface ICategoryPaths {
  title: string ;
  description: string ;
  icon: any ;
  path: string ;
}

interface NotesState {
  notes: Note[];
  status: string;
  error: string | null;
}



interface ICategorySate {
  category: ICategory[];
  status: string;
  error: string | null;
}

interface IGenericResponseState {

  response: string | null;
  status: string;
  error: string | null;
  
}

export interface IAddCategoryReq {
  categoryType: string ;
  description: string ;
}