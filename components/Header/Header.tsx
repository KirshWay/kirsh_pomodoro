'use client';

import { LogIn, LogOut, Timer, CircleUserRound, Bolt } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppSelector } from '@/lib/store/hooks';
import { cn } from '@/lib/utils';

export const Header = () => {
  const pathname = usePathname();
  const { mode } = useAppSelector((state) => state.timer);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // NOTE: temporary data
  const isAuthenticated = true;
  const user = { username: 'John Doe' };
  const loading = false;

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
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 sm:space-x-3 group"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div
            className={`relative transition-transform duration-300 ${isLogoHovered ? 'scale-110 rotate-12' : ''}`}
          >
            <Image
              src="/icons/image.png"
              alt="Pomodoro Logo"
              width={28}
              height={28}
              className="object-contain sm:w-8 sm:h-8"
            />
          </div>
          <span
            className={`text-lg sm:text-xl font-bold transition-all duration-300 ${isLogoHovered ? 'text-orange-500' : ''}`}
          >
            Kirsh Pomodoro
          </span>
        </Link>

        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Button
            className={`h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm ${isActive('/') ? getActiveButtonStyles() : ''}`}
            asChild
          >
            <Link href="/">
              <Timer className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Timer
            </Link>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <CircleUserRound className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {user?.username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex items-center justify-between">
                    <span>Settings</span>
                    <Bolt className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <Link href="/auth/login">
                  <DropdownMenuItem className="flex items-center justify-between">
                    <span>Log out</span>
                    <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm" variant="ghost" asChild>
              <Link href="/auth/login">
                <LogIn className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Войти
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
