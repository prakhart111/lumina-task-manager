import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { AnimatePresence } from 'framer-motion';
import { TaskItem } from './TaskItem';
import { useTaskStore } from '@/store/useTaskStore';
import { Task } from '@/types';
interface TaskListProps {
  tasks: Task[];
}
export function TaskList({ tasks }: TaskListProps) {
  const setTasks = useTaskStore(s => s.setTasks);
  const allTasks = useTaskStore(s => s.tasks);
  const categories = useTaskStore(s => s.categories);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = allTasks.findIndex((task) => task.id === active.id);
      const newIndex = allTasks.findIndex((task) => task.id === over.id);
      setTasks(arrayMove(allTasks, oldIndex, newIndex));
    }
  }
  const getCategoryById = (id: string | null) => categories.find(c => c.id === id);
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-muted/30 rounded-lg border border-dashed">
        <h3 className="text-xl font-semibold text-foreground">All Clear!</h3>
        <p className="text-muted-foreground mt-2">You have no tasks here. Add one to get started.</p>
      </div>
    );
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} category={getCategoryById(task.categoryId)} />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
}