'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Car,
  ShoppingCart,
  CreditCard,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useUIStore } from '@/lib/store/useUIStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Logo } from '../shared';
import { useAuthStore } from '@/lib/store';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Cars',
    href: '/admin/cars',
    icon: Car,
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Payments',
    href: '/admin/payments',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const { user, handleLogout } = useAuth();

  return (
    <div className="flex h-full flex-col bg-card">
      <div className='p-6'>
        <Logo />
      </div>

      <Separator />

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <Separator />

      <div className="p-4 space-y-4">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Signed in as
          </p>
          <p className="text-sm font-medium truncate">{user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { isMobileSidebarOpen, closeMobileSidebar } = useUIStore();
  const isAuthRoute = pathname === '/login' || pathname === '/';
  if (!isAuthenticated || isAuthRoute) {
    return null;
  }
  return (
    <>
      {/* Desktop Sidebar - Always visible on large screens */}
      <aside className="hidden lg:flex h-full w-64 flex-col border-r">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar - Slide-in sheet on small screens */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={closeMobileSidebar}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent onLinkClick={closeMobileSidebar} />
        </SheetContent>
      </Sheet>
    </>
  );
}
