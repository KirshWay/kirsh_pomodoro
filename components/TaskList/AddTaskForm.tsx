'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTaskActions } from '@/lib/store/tasksHooks';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

type AddTaskFormProps = {
  onCancel: () => void;
};

export const AddTaskForm = ({ onCancel }: AddTaskFormProps) => {
  const [pomodorosCount, setPomodorosCount] = useState(1);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [note, setNote] = useState('');
  const { addTask } = useTaskActions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await addTask({
      title: values.title,
      estimatedPomodoros: pomodorosCount,
      note: note.trim() ? note : undefined,
    });
    onCancel();
  };

  const incrementPomodoros = () => {
    setPomodorosCount((prev) => prev + 1);
  };

  const decrementPomodoros = () => {
    if (pomodorosCount > 1) {
      setPomodorosCount((prev) => prev - 1);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
        <div className="p-3 sm:p-4 border-b border-gray-100">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="What are you working on?"
                    className="text-base sm:text-lg border-none p-0 focus-visible:ring-0 placeholder:text-gray-400"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Est Pomodoros</p>
            <div className="flex items-center">
              <div className="w-16 sm:w-24 h-8 sm:h-10 bg-gray-100 flex items-center justify-center rounded-md mr-2">
                {pomodorosCount}
              </div>
              <div className="flex flex-col">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  onClick={incrementPomodoros}
                >
                  <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 sm:h-8 sm:w-8 mt-1"
                  onClick={decrementPomodoros}
                >
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {showNoteForm && (
              <Textarea
                placeholder="Add a note"
                className="mt-4"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            )}

            {showNoteForm ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowNoteForm(false);
                  setNote('');
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                type="button"
                className="text-gray-100 mr-4 flex items-center w-full"
                onClick={() => setShowNoteForm(true)}
              >
                Add Note
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3 p-3 sm:p-4 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onCancel} className="text-xs sm:text-sm">
            Cancel
          </Button>
          <Button type="submit" className="text-xs sm:text-sm">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
