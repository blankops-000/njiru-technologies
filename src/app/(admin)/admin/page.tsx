"use client";

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, Receipt, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await apiClient.get('/admin/dashboard/stats');
      return res.data.data;
    }
  });

  const stats = [
    { title: 'Total Contacts', value: data?.totalContacts || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Active Projects', value: data?.activeProjects || 0, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Unpaid Invoices', value: data?.unpaidInvoices || 0, icon: Receipt, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Total Revenue', value: `Ksh ${data?.totalRevenue?.toLocaleString() || 0}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-black dark:text-white">Overview</h1>
          <p className="text-zinc-500 font-medium">Njiru Technologies Business Operations</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 uppercase tracking-widest">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           Live Status
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-zinc-400">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-10 w-24" />
              ) : isError ? (
                <span className="text-red-500 text-sm">Error loading</span>
              ) : (
                <div className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Contacts */}
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-50 dark:border-zinc-900 pb-4">
            <CardTitle className="text-lg font-bold tracking-tight">Recent Contacts</CardTitle>
            <Link href="/admin/contacts" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black dark:hover:text-white transition-colors">View All</Link>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
               <div className="p-6 space-y-4">
                  {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
               </div>
            ) : data?.recentContacts?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-950/50 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-50 dark:border-zinc-900">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 dark:divide-zinc-900">
                    {data.recentContacts.map((contact: any) => (
                      <tr key={contact.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-zinc-900 dark:text-zinc-100">{contact.fullName}</div>
                          <div className="text-xs text-zinc-400">{contact.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                            contact.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-zinc-100 text-zinc-700'
                          }`}>
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-zinc-400">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-zinc-400 font-medium">No contacts found.</div>
            )}
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-50 dark:border-zinc-900 pb-4">
            <CardTitle className="text-lg font-bold tracking-tight">Recent Projects</CardTitle>
            <Link href="/admin/projects" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black dark:hover:text-white transition-colors">All</Link>
          </CardHeader>
          <CardContent className="px-0 pt-2 pb-0">
             {isLoading ? (
                <div className="p-6 space-y-4">
                   {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
             ) : data?.recentProjects?.length > 0 ? (
               <div className="divide-y divide-zinc-50 dark:divide-zinc-900">
                 {data.recentProjects.map((project: any) => (
                   <div key={project.id} className="p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                     <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">{project.title}</div>
                     <div className="flex justify-between items-center mt-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{project.service.name}</div>
                        <div className={`text-[10px] font-black uppercase tracking-widest ${
                          project.status === 'completed' ? 'text-green-600' : 'text-zinc-500'
                        }`}>{project.status}</div>
                     </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="p-12 text-center text-zinc-400 font-medium">No projects found.</div>
             )}
          </CardContent>
          <div className="p-4 border-t border-zinc-50 dark:border-zinc-900 mt-auto">
             <Button className="w-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white font-bold h-10 rounded-xl" asChild>
                <Link href="/admin/projects/new">New Project</Link>
             </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
