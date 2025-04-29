'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  value: number;
  size?: number;
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
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className={cn('transition-all duration-300 ease-in-out', trailClassName)}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeOpacity="0.2"
        />
        <circle
          className={cn('transition-all duration-300 ease-in-out', pathClassName)}
          cx={size / 2}
          cy={size / 2}
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
