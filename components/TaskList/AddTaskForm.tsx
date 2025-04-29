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
  title: z.string().min(1, 'Необходимо название задачи'),
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="p-4 border-b border-gray-100">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="What are you working on?"
                    className="text-lg border-none p-0 focus-visible:ring-0 placeholder:text-gray-400"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Est Pomodoros</p>
            <div className="flex items-center">
              <div className="w-24 h-10 bg-gray-100 flex items-center justify-center rounded-md mr-2">
                {pomodorosCount}
              </div>
              <div className="flex flex-col">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={incrementPomodoros}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 mt-1"
                  onClick={decrementPomodoros}
                >
                  <ChevronDown className="h-4 w-4" />
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

        <div className="bg-gray-100 p-4 flex justify-end">
          <Button type="button" variant="ghost" onClick={onCancel} className="mr-2">
            Cancel
          </Button>
          <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
