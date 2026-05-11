"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Logo } from '@/components/ui/logo';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 glass">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <Logo className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-[0.2em] leading-none text-black dark:text-white">NJIRU</span>
            <span className="text-[10px] font-bold tracking-[0.4em] leading-none text-zinc-500 mt-1">TECHNOLOGIES</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-black dark:hover:text-white relative group ${
                pathname === link.href ? 'text-black dark:text-white' : 'text-zinc-500'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-black dark:bg-white transition-all duration-300 ${
                pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
          <Button variant="outline" className="rounded-full border-2 border-black dark:border-white font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all" asChild>
            <Link href="/contact">Book Now</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6 text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-900 text-white border-none pt-12">
              <SheetHeader className="text-left mb-12 px-2">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex items-center gap-3">
                  <Logo className="h-10 w-auto" dark />
                  <div className="flex flex-col">
                    <span className="text-xl font-black tracking-[0.2em] leading-none text-white">NJIRU</span>
                    <span className="text-[10px] font-bold tracking-[0.4em] leading-none text-zinc-400 mt-1">TECHNOLOGIES</span>
                  </div>
                </div>
              </SheetHeader>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-2xl font-semibold hover:text-gray-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
