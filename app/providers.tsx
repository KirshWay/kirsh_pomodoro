'use client';

import { Provider } from 'react-redux';

import { store } from '@/lib/store/store';
import { TasksInitializer } from '@/lib/store/TasksInitializer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TasksInitializer />
      {children}
    </Provider>
  );
}
