import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api/',
  }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    listTasks: builder.query<Task[], void>({
      query: () => 'tasks/',
      providesTags: (result) =>
        result
          ? [
              ...result.map((t) => ({ type: 'Task' as const, id: t.id })),
              { type: 'Task' as const, id: 'LIST' },
            ]
          : [{ type: 'Task' as const, id: 'LIST' }],
    }),
    addTask: builder.mutation<Task, { title: string }>({
      query: (body) => ({
        url: 'tasks/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
    toggleTask: builder.mutation<Task, { id: number; completed: boolean }>({
      query: ({ id, completed }) => ({
        url: `tasks/${id}/`,
        method: 'PATCH',
        body: { completed },
      }),
      invalidatesTags: (r, e, arg) => [{ type: 'Task', id: arg.id }],
    }),
    deleteTask: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `tasks/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const {
  useListTasksQuery,
  useAddTaskMutation,
  useToggleTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;


// RTK Query is part of Redux Toolkit and provides createApi/fetchBaseQuery to define endpoints and auto-generate hooks. 
// Re