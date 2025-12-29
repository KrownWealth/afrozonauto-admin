"use client";

import { Button, ButtonProps } from '@nextui-org/react';
import { Loader2, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { forwardRef, KeyboardEvent } from 'react';

interface CustomBtnProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  onClick?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
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
      isDisabled,
      className,
      onClick,
      onKeyDown,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const buttonDisabled = disabled || isDisabled || isLoading;

    // Handle Enter key only
    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      // Call custom onKeyDown if provided
      if (onKeyDown) {
        onKeyDown(e);
      }

      // Don't handle if button is disabled
      if (buttonDisabled) {
        e.preventDefault();
        return;
      }

      // Handle only Enter key
      if (e.key === 'Enter') {
        e.preventDefault();
        if (onClick && type !== 'submit') {
          onClick();
        }
      }
    };

    return (
      <Button
        ref={ref}
        type={type}
        disabled={buttonDisabled}
        onClick={onClick}
        onKeyDown={handleKeyDown}
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