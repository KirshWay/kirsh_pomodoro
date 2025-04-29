'use client';

import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setTimerMode, TimerMode } from '@/lib/store/timerSlice';
import { cn } from '@/lib/utils';
import { getCardBgColor, getTabsBgColorActive, getTabsListBgColor } from '@/lib/utils/timer-colors';

import { Timer } from './Timer';

export const PomodoroTimer = () => {
  const mode = useAppSelector((state) => state.timer.mode);
  const dispatch = useAppDispatch();

  const handleValueChange = (value: string) => {
    dispatch(setTimerMode(value as TimerMode));
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6">
      <motion.div
        key={mode}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <Card className={cn('w-full max-w-[500px] mx-auto text-white', getCardBgColor(mode))}>
          <CardContent className="p-4 sm:p-6">
            <Tabs value={mode} onValueChange={handleValueChange} className="w-full">
              <TabsList className={cn('grid w-full grid-cols-3', getTabsListBgColor(mode))}>
                <TabsTrigger
                  value="pomodoro"
                  className={cn('text-xs sm:text-sm text-white', getTabsBgColorActive(mode))}
                >
                  Pomodoro
                </TabsTrigger>
                <TabsTrigger
                  value="shortBreak"
                  className={cn('text-xs sm:text-sm text-white', getTabsBgColorActive(mode))}
                >
                  Short Break
                </TabsTrigger>
                <TabsTrigger
                  value="longBreak"
                  className={cn('text-xs sm:text-sm text-white', getTabsBgColorActive(mode))}
                >
                  Long Break
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mt-6 sm:mt-8 focus-visible:outline-none">
                    <Timer />
                  </div>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
