import { Session } from 'next-auth';

import { Task, taskDb } from '../db/db';
import { store } from './store';
import { tasksApi, useGetTasksQuery } from './api';

export class TaskService {
  private static instance: TaskService;
  private session: Session | null = null;

  private constructor() {}

  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  public setSession(session: Session | null): void {
    this.session = session;
  }

  public async getAllTasks(): Promise<Task[]> {
    if (this.session) {
      try {
        const result = await store.dispatch(tasksApi.endpoints.getTasks.initiate());
        if (result.data) {
          return result.data;
        }
        return [];
      } catch (error) {
        console.error('Error fetching tasks from server:', error);
        return [];
      }
    } else {
      return taskDb.getAll();
    }
  }

  public async addTask(
    task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>
  ): Promise<Task | null> {
    if (this.session) {
      try {
        const result = await store.dispatch(tasksApi.endpoints.createTask.initiate(task));
        if ('data' in result && result.data) {
          return result.data;
        }
        return null;
      } catch (error) {
        console.error('Error adding task to server:', error);
        return null;
      }
    } else {
      const newTask = await taskDb.add(task);
      return newTask ?? null;
    }
  }

  public async updateTask(
    id: string,
    changes: Partial<Omit<Task, 'id' | 'createdAt'>>
  ): Promise<Task | null> {
    if (this.session) {
      try {
        const result = await store.dispatch(
          tasksApi.endpoints.updateTask.initiate({ id, ...changes })
        );
        if ('data' in result && result.data) {
          return result.data;
        }
        return null;
      } catch (error) {
        console.error('Error updating task on server:', error);
        return null;
      }
    } else {
      const updatedTask = await taskDb.update(id, changes);
      return updatedTask ?? null;
    }
  }

  public async deleteTask(id: string): Promise<boolean> {
    if (this.session) {
      try {
        const result = await store.dispatch(tasksApi.endpoints.deleteTask.initiate(id));
        if ('data' in result && result.data) {
          return result.data.success;
        }
        return false;
      } catch (error) {
        console.error('Error deleting task from server:', error);
        return false;
      }
    } else {
      await taskDb.delete(id);
      return true;
    }
  }

  public async toggleTaskComplete(id: string): Promise<Task | null> {
    if (this.session) {
      const tasks = store.getState().tasks.tasks;
      const task = tasks.find((t) => t.id === id);
      if (!task) return null;

      return this.updateTask(id, { completed: !task.completed });
    } else {
      const toggledTask = await taskDb.toggleComplete(id);
      return toggledTask || null;
    }
  }

  public async migrateTasks(tasks: Task[]): Promise<boolean> {
    if (!this.session || tasks.length === 0) return false;

    try {
      const result = await store.dispatch(tasksApi.endpoints.migrateTasks.initiate({ tasks }));
      if ('data' in result && result.data) {
        return result.data.success;
      }
      return false;
    } catch (error) {
      console.error('Error migrating tasks:', error);
      return false;
    }
  }
}

export function useTasksWithAuth(session: Session | null) {
  const { data: serverTasks, isLoading: isServerLoading } = useGetTasksQuery(undefined, {
    skip: !session,
  });

  const { tasks: localTasks, status: localStatus } = store.getState().tasks;

  const tasks = session ? serverTasks || [] : localTasks;
  const isLoading = session ? isServerLoading : localStatus === 'loading';

  return { tasks, isLoading };
}
