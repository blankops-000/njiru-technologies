"use client";

import { useAuth } from '@/lib/auth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { UserCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export function AdminHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-zinc-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <Link href="/" className="group flex items-center gap-2">
          <Logo className="h-8 w-auto" />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter leading-none text-black">NJIRU</span>
            <span className="text-[7px] font-black tracking-[0.3em] leading-none text-zinc-400 mt-1 uppercase">Technologies</span>
          </div>
        </Link>
        
        <div className="hidden md:block h-4 w-px bg-zinc-100 mx-2" />
        
        <div className="flex items-center gap-4">
          <div className="font-bold text-zinc-400 text-[10px] uppercase tracking-widest hidden md:block">
            Management Console
          </div>
          <Button variant="outline" size="sm" className="h-8 rounded-full text-xs font-bold border-zinc-200 px-4 hover:bg-black hover:text-white transition-all" asChild>
            <Link href="/" target="_blank">View Live Site</Link>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <UserCircle className="h-6 w-6 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || 'Admin'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || 'admin@njirutech.com'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
