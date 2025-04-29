import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './tasksSlice';
import timerReducer from './timerSlice';

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
