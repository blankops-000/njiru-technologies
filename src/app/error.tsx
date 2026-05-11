"use client";

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <AlertTriangle className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Something went wrong.</h1>
            <p className="text-zinc-500 font-medium">
              An unexpected error occurred. Our engineers have been notified.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="rounded-full px-8 h-14 bg-black text-white dark:bg-white dark:text-black font-bold" onClick={() => reset()}>
              <RefreshCcw className="mr-2 w-4 h-4" /> Try Again
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 border-2 font-bold" asChild>
              <a href="mailto:support@njirutech.com">Contact Support</a>
            </Button>
          </div>
        </motion.div>
        
        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Error Digest: {error.digest || 'Internal System Error'}
        </div>
      </div>
    </div>
  );
}
