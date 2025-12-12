import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import { Task, Category, FilterType } from '@/types';
interface TaskState {
  tasks: Task[];
  categories: Category[];
  activeFilter: FilterType;
  addTask: (text: string, categoryId?: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  setFilter: (filter: FilterType) => void;
}
const defaultCategories: Category[] = [
  { id: 'work', name: 'Work', color: 'bg-pink-500' },
  { id: 'personal', name: 'Personal', color: 'bg-indigo-500' },
  { id: 'study', name: 'Study', color: 'bg-green-500' },
];
export const useTaskStore = create<TaskState>()(
  persist(
    immer((set) => ({
      tasks: [
        { id: uuidv4(), text: 'Review PR for new feature', completed: false, createdAt: new Date().toISOString(), categoryId: 'work' },
        { id: uuidv4(), text: 'Schedule dentist appointment', completed: false, createdAt: new Date().toISOString(), categoryId: 'personal' },
        { id: uuidv4(), text: 'Finish Zustand state management chapter', completed: true, createdAt: new Date().toISOString(), categoryId: 'study' },
        { id: uuidv4(), text: 'Deploy the new version to production', completed: false, createdAt: new Date().toISOString(), categoryId: 'work' },
      ],
      categories: defaultCategories,
      activeFilter: 'all',
      addTask: (text: string, categoryId: string | null = null) =>
        set((state) => {
          if (!text.trim()) return;
          const newTask: Task = {
            id: uuidv4(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
            categoryId,
          };
          state.tasks.unshift(newTask);
        }),
      toggleTask: (id: string) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (task) {
            task.completed = !task.completed;
          }
        }),
      deleteTask: (id: string) =>
        set((state) => {
          state.tasks = state.tasks.filter((t) => t.id !== id);
        }),
      setTasks: (tasks: Task[]) =>
        set((state) => {
          state.tasks = tasks;
        }),
      setFilter: (filter: FilterType) =>
        set((state) => {
          state.activeFilter = filter;
        }),
    })),
    {
      name: 'lumina-task-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);