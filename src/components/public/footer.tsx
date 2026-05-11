import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { SITE_CONFIG } from '@/lib/config';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="group">
              <Logo className="h-32 w-auto" dark />
            </Link>
            <p className="text-zinc-500 text-lg max-w-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-4">
               <Link href={SITE_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer font-bold text-xs">
                 IG
               </Link>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/services?category=website" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link href="/services?category=mobile" className="hover:text-white transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services?category=ai_automation" className="hover:text-white transition-colors">AI & Automation</Link></li>
              <li><Link href="/services?category=branding" className="hover:text-white transition-colors">Brand Identity</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors">Terms</Link>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
              Made in Nairobi 🇰🇪
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
