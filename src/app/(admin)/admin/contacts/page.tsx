"use client";

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function AdminContactsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['contacts', page],
    queryFn: async () => {
      const res = await apiClient.get(`/admin/contacts?page=${page}&limit=20`);
      return res.data.data;
    }
  });

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
          <p className="text-gray-500 text-sm">Manage incoming leads and clients.</p>
        </div>
        <Button className="bg-black text-white hover:bg-gray-900">Add Contact</Button>
      </div>

      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-red-500">
                  Failed to load contacts.
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                  No contacts found.
                </TableCell>
              </TableRow>
            ) : (
              data?.map((contact: any) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium text-black">{contact.fullName}</TableCell>
                  <TableCell>{contact.companyName || '-'}</TableCell>
                  <TableCell>{contact.email || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 capitalize">
                      {contact.source.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(contact.createdAt), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">View</Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-md">
                        <SheetHeader className="mb-6">
                          <SheetTitle>Contact Details</SheetTitle>
                        </SheetHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase">Full Name</h4>
                            <p className="text-base font-medium">{contact.fullName}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase">Email</h4>
                            <p className="text-base font-medium">{contact.email || 'N/A'}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase">Phone</h4>
                            <p className="text-base font-medium">{contact.phone || 'N/A'}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase">Message</h4>
                            <div className="bg-gray-50 p-4 rounded-lg mt-2 text-sm border border-gray-100 whitespace-pre-wrap">
                              {contact.notes || 'No message.'}
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
