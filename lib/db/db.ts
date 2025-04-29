import Dexie, { Table } from 'dexie';

export type Task = {
  id: string;
  title: string;
  estimatedPomodoros: number;
  note?: string;
  project?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

class AppDatabase extends Dexie {
  tasks!: Table<Task>;

  constructor() {
    super('KirshPomodoroDb');

    this.version(1).stores({
      tasks: 'id, title, completed, createdAt, updatedAt',
    });
  }
}

export const db = new AppDatabase();

export const taskDb = {
  getAll: () => db.tasks.toArray(),

  get: (id: string) => db.tasks.get(id),

  add: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => {
    const timestamp = new Date().toISOString();
    const newTask: Task = {
      id: Date.now().toString(),
      ...task,
      completed: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await db.tasks.add(newTask);
    return newTask;
  },

  update: async (id: string, changes: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    changes.updatedAt = new Date().toISOString();
    await db.tasks.update(id, changes);
    return db.tasks.get(id);
  },

  delete: (id: string) => db.tasks.delete(id),

  toggleComplete: async (id: string) => {
    const task = await db.tasks.get(id);
    if (!task) return null;

    const completed = !task.completed;
    await db.tasks.update(id, {
      completed,
      updatedAt: new Date().toISOString(),
    });
    return db.tasks.get(id);
  },
};
