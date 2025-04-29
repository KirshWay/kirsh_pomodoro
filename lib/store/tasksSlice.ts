import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Task, taskDb } from '../db/db';

type TasksState = {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await taskDb.getAll();
});

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => {
    return await taskDb.add(task);
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, changes }: { id: string; changes: Partial<Omit<Task, 'id' | 'createdAt'>> }) => {
    return await taskDb.update(id, changes);
  }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await taskDb.delete(id);
  return id;
});

export const toggleTaskComplete = createAsyncThunk(
  'tasks/toggleTaskComplete',
  async (id: string) => {
    const updatedTask = await taskDb.toggleComplete(id);
    return updatedTask;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.tasks.findIndex((task) => task.id === action.payload!.id);
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        }
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload;
        state.tasks = state.tasks.filter((task) => task.id !== id);
      })

      .addCase(toggleTaskComplete.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.tasks.findIndex((task) => task.id === action.payload!.id);
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        }
      });
  },
});

export default tasksSlice.reducer;
