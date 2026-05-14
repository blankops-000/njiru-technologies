"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles, Code, Layout, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen noise-bg py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium tracking-wide uppercase text-zinc-600 dark:text-zinc-400 mx-auto">
            <Sparkles className="w-3 h-3" />
            <span>New Chapter Beginning</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black dark:text-white leading-[0.9]">
            Portfolio is <br />
            <span className="text-zinc-300 dark:text-zinc-700">Loading...</span>
          </h1>
          
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto font-medium">
            We are currently finalizing several high-impact deployments. Our upcoming case studies will demonstrate the intersection of rigorous engineering and elite design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-12">
          {[
            { icon: Code, label: 'Web Systems' },
            { icon: Globe, label: 'Digital Assets' },
            { icon: Layout, label: 'UI Architectures' },
            { icon: Zap, label: 'Automation' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-4 group hover:border-black dark:hover:border-white transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-16 flex flex-col items-center gap-6"
        >
          <div className="h-px w-24 bg-zinc-200 dark:bg-zinc-800" />
          <p className="text-zinc-500 font-bold tracking-tight">Be our first featured case study.</p>
          <Button size="lg" className="rounded-full px-12 h-20 text-xl font-black bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition-transform shadow-2xl shadow-black/20 dark:shadow-white/10" asChild>
            <Link href="/contact">Start Your Project <ArrowRight className="ml-4 w-6 h-6" /></Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
