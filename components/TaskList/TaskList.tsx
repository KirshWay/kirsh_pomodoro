'use client';

import React, { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AddTaskForm } from './AddTaskForm';

export type Task = {
  id: string;
  title: string;
  estimatedPomodoros: number;
  note?: string;
  project?: string;
};

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
    setOpenDialog(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-white">Tasks</h2>
      </div>

      <div className="h-[1px] bg-white/20 w-full mb-6"></div>

      {tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white/10 p-3 rounded-md">
              <p className="text-white">{task.title}</p>
              {task.note && <p className="text-white/60 text-sm mt-1">{task.note}</p>}
              <div className="flex items-center mt-2">
                <span className="text-sm text-white/70">
                  {task.estimatedPomodoros} pomodoro{task.estimatedPomodoros !== 1 ? 's' : ''}
                </span>
                {task.project && (
                  <span className="ml-2 text-sm bg-white/20 px-2 py-0.5 rounded text-white/70">
                    {task.project}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <button className="w-full border border-dashed border-white/30 text-white/70 rounded-md py-4 flex items-center justify-center cursor-pointer">
              <Plus className="h-5 w-5 mr-2" />
              Add Task
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white p-0 sm:max-w-md">
            <AddTaskForm onAddTask={handleAddTask} onCancel={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
      )}

      {tasks.length > 0 && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <button className="mt-4 w-full border border-dashed border-white/30 text-white/70 rounded-md py-4 flex items-center justify-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Task
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white p-0 sm:max-w-md">
            <AddTaskForm onAddTask={handleAddTask} onCancel={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
