'use client';

import { Check, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { db } from '@/lib/db/db';
import { useMigrateTasksMutation } from '@/lib/store/api';
import { useAllTasks } from '@/lib/store/tasksHooks';
import { cn } from '@/lib/utils';

export function MigrationDialog() {
  const { data: session } = useSession();
  const { tasks } = useAllTasks();
  const [open, setOpen] = useState(false);
  const [migrateTasks, { isLoading, isSuccess }] = useMigrateTasksMutation();
  const router = useRouter();
  const [migrationCompleted, setMigrationCompleted] = useState(false);

  useEffect(() => {
    const migrationDone = localStorage.getItem('migrationCompleted') === 'true';
    setMigrationCompleted(migrationDone);
  }, []);

  useEffect(() => {
    if (session && tasks.length > 0 && !migrationCompleted) {
      setOpen(true);
    }
  }, [session, tasks.length, migrationCompleted]);

  const handleMigrate = async () => {
    if (tasks.length === 0) return;

    try {
      await migrateTasks({ tasks });
      await db.tasks.clear();
      localStorage.setItem('migrationCompleted', 'true');
      setMigrationCompleted(true);
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error('Migration failed:', error);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('migrationCompleted', 'true');
    setMigrationCompleted(true);
    setOpen(false);
  };

  if (migrationCompleted) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sync tasks ?</DialogTitle>
          <DialogDescription>
            {`You have ${tasks.length} task${tasks.length > 1 ? '' : 's'} in your local storage. Do you want to migrate ${
              tasks.length > 1 ? 'them' : 'it'
            } to your account?`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleSkip} disabled={isLoading || isSuccess}>
            Skip
          </Button>
          <Button
            onClick={handleMigrate}
            disabled={isLoading || isSuccess}
            className={cn(
              'flex items-center gap-2',
              isSuccess && 'bg-green-600 hover:bg-green-700'
            )}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : isSuccess ? (
              <>
                <Check className="h-4 w-4" />
                Done!
              </>
            ) : (
              'Sync'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
