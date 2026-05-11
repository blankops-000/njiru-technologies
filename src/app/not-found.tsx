"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4 overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-100 dark:bg-zinc-900/50 rounded-full blur-[120px] animate-blob" />
      </div>

      <div className="container relative z-10 max-w-2xl text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <Sparkles className="w-3 h-3" />
            <span>404 Error</span>
          </div>
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-black dark:text-white leading-none">
            Lost in <br />Space.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-zinc-500 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed"
        >
          The page you are looking for has been moved or doesn't exist in our current dimension.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="rounded-full px-8 h-16 text-lg bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition-transform shadow-2xl shadow-black/20 dark:shadow-white/10" asChild>
            <Link href="/">
              <Home className="mr-2 w-5 h-5" /> Back Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-16 text-lg border-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Go Back
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8 }}
          className="pt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400"
        >
          Njiru Technologies • Engineering Excellence
        </motion.div>
      </div>
    </div>
  );
}
