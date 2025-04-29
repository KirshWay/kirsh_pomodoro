'use client';

import { Plus, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAllTasks, useTaskActions } from '@/lib/store/tasksHooks';
import { cn } from '@/lib/utils';

import { AddTaskForm } from './AddTaskForm';

const CompletionRipple = () => {
  return (
    <>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/20 pointer-events-none"
        initial={{ width: 0, height: 0 }}
        animate={{ width: 120, height: 120, opacity: [0, 0.2, 0] }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 pointer-events-none"
        initial={{ width: 0, height: 0 }}
        animate={{ width: 80, height: 80, opacity: [0, 0.15, 0] }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      />
    </>
  );
};

export const TaskList = () => {
  const { tasks, status } = useAllTasks();
  const { toggleTaskComplete, deleteTask } = useTaskActions();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteAnimation, setDeleteAnimation] = useState<string | null>(null);
  const [completedAnimation, setCompletedAnimation] = useState<string | null>(null);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleToggleComplete = (id: string, currentCompleted: boolean) => {
    if (!currentCompleted) {
      setCompletedAnimation(id);
      setTimeout(() => {
        setCompletedAnimation(null);
      }, 700);
    }
    toggleTaskComplete(id);
  };

  const handleDeleteTask = (id: string) => {
    setDeleteAnimation(id);
    setTimeout(() => {
      deleteTask(id);
      setDeleteAnimation(null);
    }, 300);
  };

  if (status === 'loading') {
    return (
      <div className="w-full max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-white">Tasks</h2>
        </div>
        <div className="h-[1px] bg-white/20 w-full mb-6" />
        <div className="text-white/70 text-center py-4">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-white">Tasks</h2>
      </div>

      <div className="h-[1px] bg-white/20 w-full mb-6" />

      {tasks.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: deleteAnimation === task.id ? 0 : 1,
                  y: deleteAnimation === task.id ? -20 : 0,
                  height: deleteAnimation === task.id ? 0 : 'auto',
                }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 p-3 rounded-md flex items-start gap-3 relative overflow-hidden"
              >
                {completedAnimation === task.id && <CompletionRipple />}

                <div className="pt-0.5 relative z-10">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleComplete(task.id, task.completed)}
                    className={cn(
                      'border-white/50 transition-all duration-300',
                      task.completed
                        ? 'bg-green-500 border-green-500 ring-0'
                        : 'data-[state=checked]:bg-white/90 data-[state=checked]:text-black',
                      completedAnimation === task.id &&
                        'ring ring-green-500/50 ring-offset-1 ring-offset-transparent'
                    )}
                  />
                </div>

                <motion.div
                  className="flex-1"
                  animate={{
                    opacity: task.completed ? 0.6 : 1,
                    filter: completedAnimation === task.id ? 'brightness(1.1)' : 'brightness(1)',
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      x: completedAnimation === task.id ? [0, -5, 0] : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-white relative">
                      {task.title}
                      <motion.span
                        className="absolute left-0 top-1/2 h-[1px] bg-white/70 pointer-events-none"
                        initial={{ width: 0 }}
                        animate={{
                          width: task.completed ? '100%' : '0%',
                        }}
                        transition={{
                          duration: 0.3,
                          delay: task.completed ? (completedAnimation === task.id ? 0.15 : 0) : 0,
                        }}
                      />
                    </p>

                    {task.note && (
                      <motion.p
                        className="text-white/60 text-sm mt-1 relative"
                        transition={{ duration: 0.3 }}
                      >
                        {task.note}
                        <motion.span
                          className="absolute left-0 top-1/2 h-[1px] bg-white/40 pointer-events-none"
                          initial={{ width: 0 }}
                          animate={{
                            width: task.completed ? '100%' : '0%',
                          }}
                          transition={{
                            duration: 0.3,
                            delay: task.completed ? (completedAnimation === task.id ? 0.25 : 0) : 0,
                          }}
                        />
                      </motion.p>
                    )}

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
                  </motion.div>
                </motion.div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-white/40 hover:text-white hover:bg-white/10 z-10"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTitle />
          <DialogTrigger asChild>
            <button className="w-full border border-dashed border-white/30 text-white/70 rounded-md py-4 flex items-center justify-center cursor-pointer">
              <Plus className="h-5 w-5 mr-2" />
              Add Task
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white p-0 sm:max-w-md">
            <AddTaskForm onCancel={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      )}

      {tasks.length > 0 && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTitle />
          <DialogTrigger asChild>
            <button className="mt-4 w-full border border-dashed border-white/30 text-white/70 rounded-md py-4 flex items-center justify-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Task
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white p-0 sm:max-w-md">
            <AddTaskForm onCancel={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
