import React from 'react';
import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTaskStore } from '@/store/useTaskStore';
import { Task, Category } from '@/types';
interface TaskItemProps {
  task: Task;
  category: Category | undefined;
}
export function TaskItem({ task, category }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const toggleTask = useTaskStore(s => s.toggleTask);
  const deleteTask = useTaskStore(s => s.deleteTask);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group flex items-center gap-4 p-4 bg-card border rounded-lg shadow-sm transition-shadow hover:shadow-md",
        task.completed && "bg-muted/50"
      )}
    >
      <div {...attributes} {...listeners} className="cursor-grab touch-none p-2 text-muted-foreground hover:text-foreground">
        <GripVertical className="h-5 w-5" />
      </div>
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => toggleTask(task.id)}
        className="h-6 w-6 rounded-full"
        aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <label
        htmlFor={`task-${task.id}`}
        className={cn(
          "flex-grow text-base font-medium cursor-pointer transition-colors",
          task.completed && "line-through text-muted-foreground"
        )}
      >
        {task.text}
      </label>
      {category && (
        <Badge variant="outline" className="hidden sm:inline-flex items-center gap-2 border-transparent">
          <span className={cn('h-2 w-2 rounded-full', category.color)}></span>
          {category.name}
        </Badge>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        onClick={handleDelete}
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}