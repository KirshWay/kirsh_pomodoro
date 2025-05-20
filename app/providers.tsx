'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

import { store } from '@/lib/store/store';
import { TasksInitializer } from '@/lib/store/TasksInitializer';
import { MigrationDialog } from '@/components/TaskList';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <TasksInitializer />
        <MigrationDialog />
        {children}
      </Provider>
    </SessionProvider>
  );
}
