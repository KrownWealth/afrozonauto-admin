import { Modal } from './Modal';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'default' | 'destructive' | 'warning' | 'success';
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  message,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  variant = 'default',
}: ConfirmModalProps) {
  const config = {
    default: {
      icon: Info,
      alertVariant: 'default' as const,
    },
    destructive: {
      icon: AlertTriangle,
      alertVariant: 'destructive' as const,
    },
    warning: {
      icon: AlertTriangle,
      alertVariant: 'default' as const,
    },
    success: {
      icon: CheckCircle,
      alertVariant: 'default' as const,
    },
  };

  const { icon, alertVariant } = config[variant];

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      icon={icon}
      showFooter
      onConfirm={onConfirm}
      confirmText={confirmText}
      cancelText={cancelText}
      isLoading={isLoading}
    >
      <Alert variant={alertVariant}>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Modal>
  );
}