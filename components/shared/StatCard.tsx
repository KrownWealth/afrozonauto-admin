"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  badge?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBgColor?: string;
  isLoading?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  badge,
  trend,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary/10',
  isLoading = false,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center', iconBgColor)}>
          <Icon className={cn('h-4 w-4', iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            {isLoading ? '...' : value}
          </div>

          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}

          {badge && (
            <Badge variant="secondary" className="mt-2">
              {badge}
            </Badge>
          )}

          {trend && (
            <div className="flex items-center gap-1 text-xs">
              <span className={cn(
                'font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}