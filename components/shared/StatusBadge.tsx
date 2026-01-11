import { Badge, badgeVariants } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';


type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];


type StatusType =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'completed'
  | 'cancelled'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'new'
  | 'used'
  | 'certified';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config: Record<StatusType, { variant: BadgeVariant; label: string; className?: string }> = {
    active: {
      variant: 'default',
      label: 'Active',
      className: 'bg-emerald-600 hover:bg-emerald-500'
    },
    inactive: {
      variant: 'secondary',
      label: 'Inactive'
    },
    pending: {
      variant: 'secondary',
      label: 'Pending',
      className: 'bg-yellow-500 hover:bg-yellow-600 text-white'
    },
    completed: {
      variant: 'default',
      label: 'Completed',
      className: 'bg-green-500 hover:bg-green-600'
    },
    cancelled: {
      variant: 'destructive',
      label: 'Cancelled'
    },
    paid: {
      variant: 'default',
      label: 'Paid',
      className: 'bg-green-500 hover:bg-green-600'
    },
    failed: {
      variant: 'destructive',
      label: 'Failed'
    },
    refunded: {
      variant: 'destructive',
      label: 'Refunded'
    },
    new: {
      variant: 'default',
      label: 'New',
      className: 'bg-blue-500 hover:bg-blue-600'
    },
    used: {
      variant: 'secondary',
      label: 'Used'
    },
    certified: {
      variant: 'default',
      label: 'Certified',
      className: 'bg-purple-500 hover:bg-purple-600'
    },
  };

  const { variant, label, className: statusClass } = config[status] || config.pending;

  return (
    <Badge
      variant={variant}
      className={cn(statusClass, className)}
    >
      {label}
    </Badge>
  );
}