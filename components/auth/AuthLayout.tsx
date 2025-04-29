'use client';

import { motion } from 'motion/react';
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
};

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md space-y-8"
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>
        </motion.div>
        {children}
      </motion.div>
    </motion.div>
  );
}
