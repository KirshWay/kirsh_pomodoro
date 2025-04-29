import type { Task } from '../db/db';
import { useAppDispatch, useAppSelector } from './hooks';
import { addTask, deleteTask, toggleTaskComplete, updateTask } from './tasksSlice';

export function useAllTasks() {
  const { tasks, status, error } = useAppSelector((state) => state.tasks);
  return { tasks, status, error };
}

export function useTask(id: string | undefined) {
  const { tasks } = useAppSelector((state) => state.tasks);
  return id ? tasks.find((task) => task.id === id) : undefined;
}

export function useTaskActions() {
  const dispatch = useAppDispatch();

  return {
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) =>
      dispatch(addTask(task)),

    updateTask: (id: string, changes: Partial<Omit<Task, 'id' | 'createdAt'>>) =>
      dispatch(updateTask({ id, changes })),

    deleteTask: (id: string) => dispatch(deleteTask(id)),

    toggleTaskComplete: (id: string) => dispatch(toggleTaskComplete(id)),
  };
}

export function useFilteredTasks(isCompleted: boolean = false) {
  const { tasks } = useAppSelector((state) => state.tasks);

  return tasks.filter((task) => task.completed === isCompleted);
}

export function useTaskStats() {
  const { tasks } = useAppSelector((state) => state.tasks);

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const incomplete = total - completed;

  return { total, completed, incomplete };
}
