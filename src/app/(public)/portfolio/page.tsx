import Link from 'next/link';
import { ArrowRight, Sparkles, Code, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PortfolioPage() {
  return (
    <div className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col justify-center">
      <div className="text-center max-w-3xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium tracking-wide uppercase text-zinc-600 dark:text-zinc-400 mx-auto">
          <Sparkles className="w-3 h-3" />
          <span>New Chapter Beginning</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Our Portfolio is <br /><span className="text-zinc-400">Loading...</span></h1>
        
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          We are currently in the process of finalizing several high-impact projects. 
          Our new case studies will showcase the depth of our engineering and the precision of our design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 max-w-2xl mx-auto">
          <div className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left group hover:bg-black hover:text-white transition-all duration-500">
             <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-zinc-800">
                <Code className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold mb-2">Web Applications</h3>
             <p className="text-sm opacity-60">Scalable, secure, and ready for production.</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left group hover:bg-black hover:text-white transition-all duration-500">
             <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-zinc-800">
                <Layout className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold mb-2">Brand Identity</h3>
             <p className="text-sm opacity-60">Visual excellence for modern digital products.</p>
          </div>
        </div>

        <div className="pt-16 flex flex-col items-center gap-4">
          <p className="text-zinc-500 font-medium">Be our first featured case study.</p>
          <Button size="lg" className="rounded-full px-12 h-16 text-lg bg-black text-white hover:scale-105 transition-transform" asChild>
            <Link href="/contact">Start Your Project <ArrowRight className="ml-3 w-6 h-6" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
