'use client';

import { useEffect } from 'react';

import { useAppDispatch } from './hooks';
import { fetchTasks } from './tasksSlice';

export function TasksInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return null;
}
