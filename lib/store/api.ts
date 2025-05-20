import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Task } from '../db/db';

type CreateTaskRequest = {
  title: string;
  note?: string;
  estimatedPomodoros?: number;
  project?: string;
};

type UpdateTaskRequest = {
  id: string;
  title?: string;
  note?: string;
  estimatedPomodoros?: number;
  project?: string;
  completed?: boolean;
};

type MigrateTasksRequest = {
  tasks: Task[];
};

type MigrateTasksResponse = {
  success: boolean;
  migrated: number;
  tasks: Task[];
};

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: ['Task'],
    }),

    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation<Task, UpdateTaskRequest>({
      query: (task) => ({
        url: '/tasks',
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),

    deleteTask: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/tasks?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),

    migrateTasks: builder.mutation<MigrateTasksResponse, MigrateTasksRequest>({
      query: (data) => ({
        url: '/tasks/migrate',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useMigrateTasksMutation,
} = tasksApi;
