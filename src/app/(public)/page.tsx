"use client";

import Link from 'next/link';
import { ArrowRight, Code, Smartphone, Bot, Palette, CheckCircle2, Globe, Zap, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

const SERVICES = [
  { title: 'Web Development', desc: 'Scalable web applications built for performance.', icon: Code, href: '/services/web-development' },
  { title: 'Mobile Apps', desc: 'Native-feel iOS & Android applications.', icon: Smartphone, href: '/services/mobile-apps' },
  { title: 'AI & Automation', desc: 'Intelligent systems to automate your workflows.', icon: Bot, href: '/services/ai-automation' },
  { title: 'Brand Identity', desc: 'Cohesive, premium branding that stands out.', icon: Palette, href: '/services/brand-identity' },
];

const PACKAGES = [
  { name: 'Starter', price: 'Ksh 50,000', desc: 'Perfect for small businesses getting started.', features: ['5 Page Website', 'Mobile Responsive', 'Basic SEO', '1 Month Support'], popular: false },
  { name: 'Growth', price: 'Ksh 150,000', desc: 'For growing businesses needing a robust presence.', features: ['Custom Web App', 'CMS Integration', 'Advanced SEO', 'Analytics Dashboard', '3 Months Support'], popular: true },
  { name: 'Premium', price: 'Custom', desc: 'Enterprise solutions tailored to your complex needs.', features: ['Full-stack App', 'Mobile App Included', 'AI Integration', 'Dedicated Account Manager', '12 Months Support'], popular: false },
];

const WORKFLOW = [
  { step: '01', title: 'Discovery', desc: 'We learn your business needs and technical requirements.' },
  { step: '02', title: 'Design', desc: 'Crafting premium, intuitive user interfaces.' },
  { step: '03', title: 'Development', desc: 'Writing clean, scalable, and secure code.' },
  { step: '04', title: 'Testing', desc: 'Rigorous QA to ensure flawless execution.' },
  { step: '05', title: 'Deployment', desc: 'Launch and continuous post-launch support.' },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full noise-bg overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-100 dark:bg-zinc-900/50 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-200 dark:bg-zinc-800/50 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-center text-center space-y-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium tracking-wide uppercase text-zinc-600 dark:text-zinc-400">
              <Sparkles className="w-3 h-3" />
              <span>Innovating from Kenya to the World</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black dark:text-white leading-[0.9] text-gradient"
            >
              Imagine.<br />Build.<br />Grow.
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="max-w-[600px] text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed font-medium"
            >
              We craft premium digital experiences through scalable web apps, native mobile solutions, and intelligent automation.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button size="lg" className="rounded-full px-8 h-14 text-base bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition-transform shadow-2xl shadow-black/20 dark:shadow-white/10" asChild>
                <Link href="/contact">Start a Project</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all" asChild>
                <Link href="/services">Our Expertise</Link>
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-50 grayscale"
            >
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter"><Globe className="w-5 h-5" /> GLOBAL</div>
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter"><Zap className="w-5 h-5" /> FAST</div>
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter"><Shield className="w-5 h-5" /> SECURE</div>
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter"><Code className="w-5 h-5" /> CLEAN</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight">Our Core Services</h3>
            </div>
            <p className="max-w-md text-zinc-500 text-lg">
              End-to-end digital engineering tailored for growth-oriented businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv, idx) => (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass-card group border-none hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500 h-full overflow-hidden">
                  <CardHeader className="relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-100 dark:bg-zinc-800 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <div className="w-14 h-14 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center relative z-10 shadow-xl">
                      <srv.icon className="w-7 h-7" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <CardTitle className="text-2xl font-bold tracking-tight group-hover:translate-x-1 transition-transform">{srv.title}</CardTitle>
                    <p className="text-zinc-500 leading-relaxed">{srv.desc}</p>
                  </CardContent>
                  <CardFooter className="relative z-10 pt-4">
                    <Link href={srv.href} className="text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                      Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-32 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">Pricing</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight">Invest in Quality</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PACKAGES.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <div className={`relative h-full flex flex-col p-8 rounded-[2rem] transition-all duration-500 ${
                  pkg.popular 
                    ? 'bg-black text-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] scale-105 z-10' 
                    : 'bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800'
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-2 px-6 rounded-full shadow-xl">
                      Recommended
                    </div>
                  )}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold mb-2 opacity-70">{pkg.name}</h4>
                    <div className="text-4xl font-black tracking-tighter">{pkg.price}</div>
                  </div>
                  <p className={`mb-8 text-sm ${pkg.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>{pkg.desc}</p>
                  <ul className="space-y-4 flex-1 mb-12">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className={`w-5 h-5 ${pkg.popular ? 'text-white' : 'text-black dark:text-white'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full h-14 rounded-2xl font-bold text-lg transition-transform hover:scale-[1.02] ${
                    pkg.popular ? 'bg-white text-black hover:bg-zinc-100' : 'bg-black text-white dark:bg-white dark:text-black'
                  }`} asChild>
                    <Link href="/contact">Select Plan</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-950">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6">Workflow</h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">The Path to <br />Execution.</h3>
              <p className="text-zinc-500 text-xl leading-relaxed mb-12">
                We've refined our engineering process to ensure maximum transparency and predictable delivery.
              </p>
              <div className="space-y-8">
                {WORKFLOW.slice(0, 3).map((w) => (
                  <div key={w.step} className="flex gap-6 group">
                    <div className="text-4xl font-black text-zinc-300 dark:text-zinc-800 transition-colors group-hover:text-black dark:group-hover:text-white">{w.step}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{w.title}</h4>
                      <p className="text-zinc-500 text-sm">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
               <div className="aspect-square bg-zinc-200 dark:bg-zinc-900 rounded-[3rem] p-12 flex flex-col justify-between group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-8xl font-black text-black/5 dark:text-white/5 absolute -bottom-10 -right-10 group-hover:scale-110 transition-transform duration-700">BUILD</div>
                  <h4 className="text-3xl font-black tracking-tight relative z-10">Premium<br />Quality First.</h4>
                  <p className="max-w-xs text-zinc-500 relative z-10">We don't cut corners. Every pixel and line of code is optimized for production excellence.</p>
                  <div className="w-16 h-1 w-full bg-black dark:bg-white relative z-10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_white,_transparent)] scale-150 blur-3xl" />
        </div>
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">Ready to <br />Transform?</h2>
            <p className="max-w-2xl mx-auto text-zinc-400 text-xl">
              Join the league of elite Kenyan businesses scaling with Njiru Technologies.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-20 px-12 rounded-full text-2xl font-black shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform" asChild>
              <Link href="/contact">Let's Talk Projects <ArrowRight className="ml-4 w-8 h-8" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
