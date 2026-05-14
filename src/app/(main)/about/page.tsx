"use client";

import Image from 'next/image';
import { CheckCircle2, Shield, Zap, Target, Sparkles, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen noise-bg py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium tracking-wide uppercase text-zinc-600 dark:text-zinc-400">
              <Sparkles className="w-3 h-3" />
              <span>Our Mission</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black dark:text-white leading-[0.9]">
              Engineering<br />Progress.
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              Njiru Technologies was founded to bridge the gap between local business ambition and global technical excellence.
            </p>
            <div className="space-y-4 text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">
              <p>
                We believe that premium digital experiences should be the standard, not a luxury. In an increasingly digital world, the quality of your software defines the ceiling of your growth.
              </p>
              <p>
                Through lean methodologies and rigorous engineering standards, we deliver systems that are both visually stunning and architecturally sound.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl group"
          >
            <Image 
              src="/njiru-tech-logo.jpeg" 
              alt="Njiru Technologies Logo" 
              fill
              className="object-contain p-16 transition-transform duration-700 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Values/Why Us */}
        <div className="mb-32">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">Our Core Pillars</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight">Built on Precision.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:border-black dark:hover:border-white"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-8">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-4">Speed & Scale</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                We utilize the latest stacks to ensure your products load instantly and scale horizontally to millions of users without friction.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:border-black dark:hover:border-white"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-8">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-4">Security First</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                Adhering to the Kenya Data Protection Act is just the floor. We implement enterprise-grade encryption and security protocols as a standard.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:border-black dark:hover:border-white"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-8">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-4">Elite Standards</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                We don't do "good enough." Every project is a testament to our pursuit of visual excellence and engineering mastery.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Trust Signals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-black text-white rounded-[3rem] p-16 text-center space-y-12 overflow-hidden relative"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight mb-12">Verified Authority</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-zinc-400">Registered Ltd.</span>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-zinc-400">DPA Compliant</span>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-zinc-400">In-house Talent</span>
              </div>
            </div>
          </div>
          {/* Subtle background element */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
}
