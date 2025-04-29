import Link from 'next/link';
import React from 'react';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Registration"
      subtitle={
        <>
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}
