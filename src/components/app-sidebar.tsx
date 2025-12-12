import React from 'react';
import { Inbox, Calendar, CheckSquare, Tag, Circle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useTaskStore } from '@/store/useTaskStore';
import { cn } from '@/lib/utils';
export function AppSidebar(): JSX.Element {
  const categories = useTaskStore(state => state.categories);
  const activeFilter = useTaskStore(state => state.activeFilter);
  const setFilter = useTaskStore(state => state.setFilter);
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-indigo-500 to-pink-500" />
          <span className="text-lg font-semibold tracking-tight">Lumina</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setFilter('all')} isActive={activeFilter === 'all'}>
                <Inbox /> <span>Inbox</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setFilter('today')} isActive={activeFilter === 'today'}>
                <Calendar /> <span>Today</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setFilter('upcoming')} isActive={activeFilter === 'upcoming'}>
                <Calendar /> <span>Upcoming</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setFilter('completed')} isActive={activeFilter === 'completed'}>
                <CheckSquare /> <span>Completed</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2"><Tag className="size-4" /> Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categories.map(category => (
              <SidebarMenuItem key={category.id}>
                <SidebarMenuButton onClick={() => setFilter(category.id)} isActive={activeFilter === category.id}>
                  <span className={cn("h-3 w-3 rounded-full", category.color)}></span>
                  <span>{category.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}