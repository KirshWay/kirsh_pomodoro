'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type SizeType = number | { base: number; sm?: number; md?: number; lg?: number; xl?: number };

type Props = {
  value: number;
  size?: SizeType;
  thickness?: number;
  className?: string;
  pathClassName?: string;
  trailClassName?: string;
  children?: React.ReactNode;
};

export function CircularProgress({
  value,
  size = 300,
  thickness = 8,
  className,
  pathClassName,
  trailClassName,
  children,
}: Props) {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const [currentSize, setCurrentSize] = useState<number>(
    typeof size === 'number' ? size : size.base
  );

  useEffect(() => {
    function handleResize() {
      if (typeof size === 'number') {
        setCurrentSize(size);
        return;
      }

      const { innerWidth } = window;

      if (innerWidth >= 1280 && size.xl) {
        setCurrentSize(size.xl);
      } else if (innerWidth >= 1024 && size.lg) {
        setCurrentSize(size.lg);
      } else if (innerWidth >= 768 && size.md) {
        setCurrentSize(size.md);
      } else if (innerWidth >= 640 && size.sm) {
        setCurrentSize(size.sm);
      } else {
        setCurrentSize(size.base);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [size]);

  const radius = (currentSize - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        className="transform -rotate-90"
        width={currentSize}
        height={currentSize}
        viewBox={`0 0 ${currentSize} ${currentSize}`}
      >
        <circle
          className={cn('transition-all duration-300 ease-in-out', trailClassName)}
          cx={currentSize / 2}
          cy={currentSize / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeOpacity="0.2"
        />
        <circle
          className={cn('transition-all duration-300 ease-in-out', pathClassName)}
          cx={currentSize / 2}
          cy={currentSize / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
