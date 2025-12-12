import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTaskStore } from '@/store/useTaskStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function CreateTask() {
  const [taskText, setTaskText] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const addTask = useTaskStore(s => s.addTask);
  const categories = useTaskStore(s => s.categories);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText, categoryId || undefined);
      setTaskText('');
      setCategoryId(null);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 bg-background border rounded-lg shadow-sm transition-all focus-within:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
    >
      <Plus className="h-5 w-5 text-muted-foreground ml-2" />
      <Input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow border-0 shadow-none focus-visible:ring-0 text-base"
      />
      <Select onValueChange={setCategoryId} value={categoryId || ''}>
        <SelectTrigger className="w-[130px] border-0 shadow-none focus:ring-0 text-muted-foreground">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Category</SelectItem>
          {categories.map(cat => (
            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" size="sm" className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90 transition-opacity">
        Add Task
      </Button>
    </form>
  );
}