export interface Category {
  id: string;
  name: string;
  color: string; // Tailwind color class e.g., 'bg-blue-500'
}
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string; // ISO string
  categoryId: string | null;
}
export type FilterType = 'all' | 'today' | 'upcoming' | 'completed' | string; // string for category IDs