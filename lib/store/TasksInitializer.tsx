'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { useAppDispatch } from './hooks';
import { fetchTasks } from './tasksSlice';
import { TaskService } from './TaskService';

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
