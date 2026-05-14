"use client";

import Link from 'next/link';
import { ArrowRight, Code, Smartphone, Bot, Palette, Zap, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Web App', 'Mobile App', 'AI & Automation', 'Branding'];

const SERVICES = [
  { 
    title: 'Corporate Web Engineering', 
    category: 'Web App', 
    price: 'From Ksh 50k', 
    desc: 'Scalable, high-performance web solutions built with Next.js and React for enterprise-grade performance.',
    icon: Globe
  },
  { 
    title: 'E-commerce Ecosystems', 
    category: 'Web App', 
    price: 'From Ksh 80k', 
    desc: 'End-to-end online stores with M-Pesa integration, inventory management, and automated logistics.',
    icon: Zap
  },
  { 
    title: 'Native Mobile Solutions', 
    category: 'Mobile App', 
    price: 'From Ksh 150k', 
    desc: 'Immersive iOS and Android experiences that feel native and perform flawlessly on all devices.',
    icon: Smartphone
  },
  { 
    title: 'Intelligent Automation', 
    category: 'AI & Automation', 
    price: 'Custom', 
    desc: 'Leverage LLMs and custom workflows to automate business operations and reduce manual overhead.',
    icon: Bot
  },
  { 
    title: 'Premium Brand Identity', 
    category: 'Branding', 
    price: 'From Ksh 15k', 
    desc: 'Cohesive visual systems including logos, typography, and motion tokens tailored for the digital age.',
    icon: Palette
  },
  { 
    title: 'Full-Stack Consulting', 
    category: 'All', 
    price: 'Custom', 
    desc: 'Strategic technical advice and execution for complex digital transformations and legacy migrations.',
    icon: Code
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen noise-bg py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-3xl mb-20 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium tracking-wide uppercase text-zinc-600 dark:text-zinc-400">
            <Sparkles className="w-3 h-3" />
            <span>Expertise & Solutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black dark:text-white leading-none">
            Digital<br />Engineering.
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium max-w-2xl">
            We provide specialized technical services designed to help Kenyan businesses compete on a global scale.
          </p>
        </motion.div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-16 no-scrollbar">
          {CATEGORIES.map((cat, i) => (
            <Button key={i} variant={i === 0 ? "default" : "outline"} className={`rounded-full px-8 h-12 text-sm font-bold tracking-tight transition-all ${i === 0 ? 'bg-black text-white dark:bg-white dark:text-black hover:scale-105' : 'text-zinc-500 hover:border-black dark:hover:border-white'}`}>
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/contact`} className="block h-full">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-10 h-full flex flex-col justify-between transition-all duration-500 group-hover:border-black dark:group-hover:border-white group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-8 transition-colors group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                      <srv.icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 block">{srv.category}</span>
                    <h3 className="text-2xl font-black tracking-tight mb-4 leading-tight">{srv.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">{srv.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="text-lg font-black tracking-tight">{srv.price}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom Solution CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-12 rounded-[3rem] bg-black text-white relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="relative z-10 space-y-4">
            <h2 className="text-4xl font-black tracking-tighter">Need a Custom Solution?</h2>
            <p className="text-zinc-400 text-lg max-w-xl">If your project doesn't fit into a standard category, our engineers can build a bespoke system from the ground up.</p>
          </div>
          <Button size="lg" className="relative z-10 bg-white text-black hover:bg-zinc-100 h-16 px-10 rounded-full font-black text-lg transition-transform hover:scale-105" asChild>
            <Link href="/contact">Book a Consultation</Link>
          </Button>
          <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800 rounded-full -mr-32 -mt-32 opacity-20 blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
}
