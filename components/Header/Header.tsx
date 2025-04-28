'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Timer, BarChart2, Settings, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/store/hooks';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { mode } = useAppSelector((state) => state.timer);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const getHeaderStyles = () => {
    switch (mode) {
      case 'pomodoro':
        return 'border-red-100 bg-white/90 backdrop-blur-md';
      case 'shortBreak':
        return 'border-green-100 bg-white/90 backdrop-blur-md';
      case 'longBreak':
        return 'border-blue-100 bg-white/90 backdrop-blur-md';
      default:
        return 'border-gray-200 bg-white/90 backdrop-blur-md';
    }
  };

  const getActiveButtonStyles = () => {
    switch (mode) {
      case 'pomodoro':
        return 'bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800';
      case 'shortBreak':
        return 'bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800';
      case 'longBreak':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800';
      default:
        return 'bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800';
    }
  };

  return (
    <header className={cn('w-full border-b', getHeaderStyles())}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center space-x-3 group"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div
            className={`relative transition-transform duration-300 ${isLogoHovered ? 'scale-110 rotate-12' : ''}`}
          >
            <Image
              src="/icons/image.png"
              alt="Pomodoro Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span
            className={`text-xl font-bold transition-all duration-300 ${isLogoHovered ? 'text-orange-500' : ''}`}
          >
            Kirsh Pomodoro
          </span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Button
            variant={isActive('/') ? 'default' : 'ghost'}
            size="sm"
            className={cn('flex items-center space-x-1', isActive('/') && getActiveButtonStyles())}
            asChild
          >
            <Link href="/">
              <Timer className="h-4 w-4" />
              <span>Timer</span>
            </Link>
          </Button>

          {/* TODO: Add pages */}

          {/* <Button
            variant={isActive('/history') ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'flex items-center space-x-1',
              isActive('/history') && getActiveButtonStyles()
            )}
            asChild
          >
            <Link href="/history">
              <BarChart2 className="h-4 w-4" />
              <span>History</span>
            </Link>
          </Button>

          <Button
            variant={isActive('/settings') ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'flex items-center space-x-1',
              isActive('/settings') && getActiveButtonStyles()
            )}
            asChild
          >
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </Button> */}
        </nav>
      </div>
    </header>
  );
};
