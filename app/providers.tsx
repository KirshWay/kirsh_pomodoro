'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Provider } from 'react-redux';

import { MigrationDialog } from '@/components/TaskList';
import { store } from '@/lib/store/store';
import { TasksInitializer } from '@/lib/store/TasksInitializer';

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
