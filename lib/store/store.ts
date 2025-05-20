import { configureStore } from '@reduxjs/toolkit';

import { tasksApi } from './api';
import tasksReducer from './tasksSlice';
import timerReducer from './timerSlice';

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    tasks: tasksReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
