'use client';

import { motion } from 'motion/react';

import { PomodoroTimer } from '@/components/PomodoroTimer';
import { TaskList } from '@/components/TaskList';
import { useAppSelector } from '@/lib/store/hooks';
import { getBackgroundColor } from '@/lib/utils/timer-colors';

export default function Home() {
  const { mode } = useAppSelector((state) => state.timer);

  return (
    <motion.div
      className="min-h-screen"
      animate={{ backgroundColor: getBackgroundColor(mode) }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto py-8 flex flex-col gap-8">
        <PomodoroTimer />
        <TaskList />
      </div>
    </motion.div>
  );
}
