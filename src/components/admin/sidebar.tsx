"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Receipt, 
  Wrench, 
  Settings, 
  FileText 
} from 'lucide-react';

const ADMIN_LINKS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Contacts', href: '/admin/contacts', icon: Users },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Invoices & Payments', href: '/admin/invoices', icon: Receipt },
  { name: 'Maintenance', href: '/admin/maintenance', icon: Wrench },
  { name: 'Services Catalog', href: '/admin/services', icon: Settings },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-72 bg-black text-white min-h-screen sticky top-0 shadow-2xl">
      <div className="h-20 flex items-center px-8 border-b border-zinc-900">
        <Link href="/admin" className="flex items-center gap-2 group">
           <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-black group-hover:rotate-12 transition-transform">N</div>
           <div className="flex flex-col">
              <span className="font-black tracking-tighter text-lg leading-none">NJIRU</span>
              <span className="text-[6px] font-black tracking-[0.4em] text-zinc-500 uppercase">Admin Panel</span>
           </div>
        </Link>
      </div>
      <nav className="flex-1 py-10 px-6 space-y-2">
        {ADMIN_LINKS.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isActive 
                  ? 'bg-zinc-900 text-white shadow-lg' 
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <link.icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-zinc-600'}`} />
              {link.name}
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-zinc-900">
         <div className="bg-zinc-900 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-400" />
            <div className="flex flex-col min-w-0">
               <span className="text-[10px] font-black uppercase tracking-widest truncate">System Admin</span>
               <span className="text-[8px] font-bold text-zinc-500 truncate">NJIRU TECH</span>
            </div>
         </div>
      </div>
    </aside>
  );
}
