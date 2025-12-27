
'use client'

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner, StatCard, EmptyState } from '@/components/shared';
import { useDashboardStats, useRecentActivities } from '@/lib/hooks';


import {
  Users,
  Car,
  ShoppingCart,
  DollarSign,
  Clock,
  Activity
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: activities, isLoading: activitiesLoading } = useRecentActivities();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4" />;
      case 'payment':
        return <DollarSign className="h-4 w-4" />;
      case 'user':
        return <Users className="h-4 w-4" />;
      case 'car':
        return <Car className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-purple-100 text-purple-600';
      case 'payment':
        return 'bg-emerald-100 text-emerald-600';
      case 'user':
        return 'bg-blue-100 text-blue-600';
      case 'car':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div>
      <Header
        title="Dashboard"
        description="Overview of your platform metrics and activities"
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={Users}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
            isLoading={statsLoading}
          />

          <StatCard
            title="Total Cars"
            value={stats?.totalCars || 0}
            icon={Car}
            description={`${stats?.apiCars || 0} API • ${stats?.manualCars || 0} Manual`}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
            isLoading={statsLoading}
          />

          <StatCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            icon={ShoppingCart}
            badge={stats?.pendingOrders ? `${stats.pendingOrders} Pending` : undefined}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
            isLoading={statsLoading}
          />

          <StatCard
            title="Total Revenue"
            value={`$${((stats?.totalRevenue || 0) / 1000).toFixed(1)}k`}
            icon={DollarSign}
            trend={{
              value: '12.5%',
              isPositive: true,
            }}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-100"
            isLoading={statsLoading}
          />
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activitiesLoading ? (
              <LoadingSpinner text="Loading activities..." />
            ) : activities && activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className={cn(
                      'h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0',
                      getActivityColor(activity.type)
                    )}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {activity.userName && (
                          <>
                            <span>{activity.userName}</span>
                            <span>•</span>
                          </>
                        )}
                        <span>
                          {formatDistanceToNow(new Date(activity.timestamp), {
                            addSuffix: true
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Activity}
                title="No recent activities"
                description="Activities will appear here as users interact with the platform"
              />
            )}
          </CardContent>
        </Card>

        {/* Quick Stats Summary */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {statsLoading ? '...' : stats?.pendingOrders || 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Requires immediate attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Car Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">API Cars</span>
                  <span className="text-sm font-medium">
                    {statsLoading ? '...' : stats?.apiCars || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Manual Cars</span>
                  <span className="text-sm font-medium">
                    {statsLoading ? '...' : stats?.manualCars || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}