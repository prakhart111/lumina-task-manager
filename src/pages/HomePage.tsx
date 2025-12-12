import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StatsWidget } from '@/components/dashboard/StatsWidget';
import { CreateTask } from '@/components/tasks/CreateTask';
import { TaskList } from '@/components/tasks/TaskList';
import { useTaskStore } from '@/store/useTaskStore';
import { isToday, isFuture, isPast } from 'date-fns';
export function HomePage() {
  const tasks = useTaskStore(s => s.tasks);
  const activeFilter = useTaskStore(s => s.activeFilter);
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'today':
        return tasks.filter(task => isToday(new Date(task.createdAt)) && !task.completed);
      case 'upcoming':
        return tasks.filter(task => isFuture(new Date(task.createdAt)) && !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'all':
        return tasks.filter(task => !task.completed);
      default: // Category filter
        return tasks.filter(task => task.categoryId === activeFilter && !task.completed);
    }
  }, [tasks, activeFilter]);
  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'today': return 'Today\'s Tasks';
      case 'upcoming': return 'Upcoming Tasks';
      case 'completed': return 'Completed Tasks';
      case 'all': return 'Inbox';
      default:
        const category = useTaskStore.getState().categories.find(c => c.id === activeFilter);
        return category ? category.name : 'Inbox';
    }
  };
  return (
    <AppLayout>
      <div className="flex flex-col h-screen">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Good Morning!</h1>
                <p className="text-sm text-muted-foreground">{format(new Date(), 'EEEE, MMMM d')}</p>
              </div>
              <ThemeToggle className="relative top-0 right-0" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8 md:py-10 lg:py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <StatsWidget />
                <div className="space-y-6">
                  <CreateTask />
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight">{getFilterTitle()}</h2>
                    <AnimatePresence>
                      <TaskList tasks={filteredTasks} />
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground border-t">
          Built with ❤��� at Cloudflare
        </footer>
      </div>
    </AppLayout>
  );
}