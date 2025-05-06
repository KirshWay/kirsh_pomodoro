'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

import { store } from '@/lib/store/store';
import { TasksInitializer } from '@/lib/store/TasksInitializer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <TasksInitializer />
        {children}
      </Provider>
    </SessionProvider>
  );
}
