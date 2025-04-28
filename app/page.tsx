'use client';

import { motion } from 'motion/react';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { TaskList } from '@/components/TaskList';
import { useAppSelector } from '@/lib/store/hooks';

function getBgVariantColor() {
  const { mode } = useAppSelector((state) => state.timer);

  switch (mode) {
    case 'pomodoro':
      return '#be123c';
    case 'shortBreak':
      return '#166534';
    case 'longBreak':
      return '#2563eb';
    default:
      return '#be123c';
  }
}

export default function Home() {
  return (
    <motion.main
      className="min-h-screen"
      animate={{ backgroundColor: getBgVariantColor() }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto py-8 flex flex-col gap-8">
        <PomodoroTimer />
        <TaskList />
      </div>
    </motion.main>
  );
}
