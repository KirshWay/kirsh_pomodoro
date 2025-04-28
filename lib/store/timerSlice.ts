import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';
export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

type TimerState = {
  mode: TimerMode;
  status: TimerStatus;
  progress: number;
  timeLeft: number;
  totalTime: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
};

const initialState: TimerState = {
  mode: 'pomodoro',
  status: 'idle',
  progress: 0,
  timeLeft: 25 * 60,
  totalTime: {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  },
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimerMode: (state, action: PayloadAction<TimerMode>) => {
      state.mode = action.payload;
      state.timeLeft = state.totalTime[action.payload];
      state.progress = 0;
      state.status = 'idle';
    },
    startTimer: (state) => {
      state.status = 'running';
    },
    pauseTimer: (state) => {
      state.status = 'paused';
    },
    resetTimer: (state) => {
      state.timeLeft = state.totalTime[state.mode];
      state.progress = 0;
      state.status = 'idle';
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      const secondsPassed = action.payload;
      if (state.status === 'running') {
        state.timeLeft = Math.max(0, state.timeLeft - secondsPassed);
        state.progress = Math.min(
          100,
          ((state.totalTime[state.mode] - state.timeLeft) / state.totalTime[state.mode]) * 100
        );

        if (state.timeLeft === 0) {
          state.status = 'finished';
        }
      }
    },
  },
});

export const { setTimerMode, startTimer, pauseTimer, resetTimer, updateTimer } = timerSlice.actions;

export default timerSlice.reducer;
