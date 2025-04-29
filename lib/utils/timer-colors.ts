import { TimerMode } from '@/lib/store/timerSlice';

export const getBackgroundColor = (mode: TimerMode): string => {
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
};

export const getCardBgColor = (mode: TimerMode): string => {
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

export const getTabsListBgColor = (mode: TimerMode): string => {
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

export const getTabsBgColorActive = (mode: TimerMode): string => {
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
