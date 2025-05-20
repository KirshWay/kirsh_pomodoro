'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useAppDispatch } from './hooks';
import { TaskService } from './TaskService';
import { fetchTasks } from './tasksSlice';

export function TasksInitializer() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const taskService = TaskService.getInstance();

  useEffect(() => {
    taskService.setSession(session);

    if (!session) {
      dispatch(fetchTasks());
    }
  }, [dispatch, session, taskService]);

  return null;
}
