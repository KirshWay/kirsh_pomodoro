'use client';

import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { pauseTimer, resetTimer, startTimer, updateTimer } from '@/lib/store/timerSlice';
import { cn } from '@/lib/utils';

export const Timer = () => {
  const dispatch = useAppDispatch();
  const { mode, status, progress, timeLeft } = useAppSelector((state) => state.timer);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (status === 'running') {
      dispatch(pauseTimer());
    } else {
      dispatch(startTimer());
    }
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  useEffect(() => {
    if (status === 'running' && !intervalId) {
      const id = setInterval(() => {
        dispatch(updateTimer(1));
      }, 1000);
      setIntervalId(id);
    } else if (status !== 'running' && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [status, intervalId, dispatch]);

  const getProgressColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'text-red-500';
      case 'shortBreak':
        return 'text-green-500';
      case 'longBreak':
        return 'text-blue-500';
      default:
        return 'text-red-500';
    }
  };

  const getButtonColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'text-red-700';
      case 'shortBreak':
        return 'text-green-800';
      case 'longBreak':
        return 'text-blue-600';
      default:
        return 'text-red-700';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <CircularProgress
        value={progress}
        size={320}
        thickness={6}
        className={cn('text-white')}
        pathClassName={getProgressColor()}
      >
        <div className="text-[6rem] font-light leading-none">{formatTime(timeLeft)}</div>
      </CircularProgress>

      <div className="mt-8 flex gap-3">
        <Button
          className={cn('px-12 py-6 text-xl bg-white hover:bg-gray-100', getButtonColor())}
          onClick={handleStartPause}
        >
          {status === 'running' ? 'PAUSE' : 'START'}
        </Button>

        {(status === 'paused' || status === 'finished') && (
          <Button
            className={cn('px-12 py-6 text-xl bg-white hover:bg-gray-100', getButtonColor())}
            onClick={handleReset}
          >
            RESET
          </Button>
        )}
      </div>
    </div>
  );
};
