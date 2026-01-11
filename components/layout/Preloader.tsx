'use client';

import { Logo } from '@/components/shared';
import { Loader2 } from 'lucide-react';

interface PreloaderProps {
  message?: string;
  variant?: 'default' | 'minimal' | 'fancy';
}

export function Preloader({
  message = 'Loading...',
  variant = 'default'
}: PreloaderProps) {

  if (variant === 'minimal') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Logo />
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (variant === 'fancy') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

        <div className="relative">

          {/* Animated background circles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-emerald-200/30 dark:bg-emerald-500/10 blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-blue-200/30 dark:bg-blue-500/10 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-700">
            {/* Logo with glow effect */}
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-emerald-500/20 rounded-full animate-pulse" />
              <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl">
                <Logo />
              </div>
            </div>

            {/* Loading content */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-emerald-200 dark:border-emerald-900" />
                <Loader2 className="h-12 w-12 absolute inset-0 animate-spin text-emerald-600 dark:text-emerald-400" />
              </div>

              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {message}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Preparing your admin panel
                </p>
              </div>

              {/* Animated progress dots */}
              <div className="flex gap-2 mt-2">
                <div className="h-2 w-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Default variant
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
        {/* Logo with subtle animation */}
        <div className="transform transition-all duration-300 hover:scale-105">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg">
            <Logo />
          </div>
        </div>

        {/* Loading spinner with text */}
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            {message}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
}
