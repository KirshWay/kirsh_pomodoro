'use client';

import { signIn, signOut as nextAuthSignOut } from 'next-auth/react';

export async function login({ email, password }: { email: string; password: string }) {
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });

  return result;
}

export async function register({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username?: string;
}) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, username }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return login({ email, password });
}

export async function signOut(options?: { callbackUrl?: string }) {
  await nextAuthSignOut({
    callbackUrl: options?.callbackUrl || '/',
  });
}
