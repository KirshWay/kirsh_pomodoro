'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { TimerMode, setTimerMode } from '@/lib/store/timerSlice';
import { cn } from '@/lib/utils';
import { Timer } from './Timer';

export const PomodoroTimer = () => {
  const mode = useAppSelector((state) => state.timer.mode);
  const dispatch = useAppDispatch();

  const handleValueChange = (value: string) => {
    dispatch(setTimerMode(value as TimerMode));
  };

  const getCardBgColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'bg-red-700/90';
      case 'shortBreak':
        return 'bg-green-800/90';
      case 'longBreak':
        return 'bg-blue-600/90';
      default:
        return 'bg-red-700/90';
    }
  };

  const getTabsListBgColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'bg-red-800/50';
      case 'shortBreak':
        return 'bg-green-900/50';
      case 'longBreak':
        return 'bg-blue-700/50';
      default:
        return 'bg-red-800/50';
    }
  };

  const getTabsBgColorActive = () => {
    switch (mode) {
      case 'pomodoro':
        return 'data-[state=active]:bg-red-900';
      case 'shortBreak':
        return 'data-[state=active]:bg-green-950';
      case 'longBreak':
        return 'data-[state=active]:bg-blue-800';
      default:
        return 'data-[state=active]:bg-red-900';
    }
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        key={mode}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className={cn('w-[500px] text-white', getCardBgColor())}>
          <CardContent className="p-6">
            <Tabs value={mode} onValueChange={handleValueChange} className="w-full">
              <TabsList className={cn('grid w-full grid-cols-3', getTabsListBgColor())}>
                <TabsTrigger value="pomodoro" className={cn('text-white', getTabsBgColorActive())}>
                  Pomodoro
                </TabsTrigger>
                <TabsTrigger
                  value="shortBreak"
                  className={cn('text-white', getTabsBgColorActive())}
                >
                  Short Break
                </TabsTrigger>
                <TabsTrigger value="longBreak" className={cn('text-white', getTabsBgColorActive())}>
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
                  <div className="mt-8 focus-visible:outline-none">
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
