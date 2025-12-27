'use client';

import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUIStore } from '@/lib/store/useUIStore';

interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  const { openMobileSidebar } = useUIStore();

  return (
    <div className="sticky top-0 z-10 border-b bg-card">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={openMobileSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
            {description && (
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
        </div>
      </div>
    </div>
  );
}
