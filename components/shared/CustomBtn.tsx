"use client";


import { Button, ButtonProps } from '@nextui-org/react';
import { Loader2, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface CustomBtnProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  continueText?: string;
  onClick?: () => void;
}

export const CustomBtn = forwardRef<HTMLButtonElement, CustomBtnProps>(
  (
    {
      children,
      isLoading = false,
      loadingText,
      icon: Icon,
      iconPosition = 'left',
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <Button
        ref={ref}
        disabled={isDisabled}
        className={cn(className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon className="mr-2 h-4 w-4" />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
              <Icon className="ml-2 h-4 w-4" />
            )}
          </>
        )}
      </Button>
    );
  }
);

CustomBtn.displayName = 'CustomBtn';