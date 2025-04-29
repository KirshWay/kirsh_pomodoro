import Link from 'next/link';
import React from 'react';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Enter your account"
      subtitle={
        <>
          or{' '}
          <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            register
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
