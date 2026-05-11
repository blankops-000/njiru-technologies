"use client";

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function AdminServicesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin_services'],
    queryFn: async () => {
      const res = await apiClient.get(`/admin/services`);
      return res.data.data;
    }
  });

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services Catalog</h1>
        </div>
        <Button className="bg-black text-white hover:bg-gray-900">Add Service</Button>
      </div>

      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Starting Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                </TableRow>
              ))
            ) : isError ? (
              <TableRow><TableCell colSpan={5} className="text-center">Error</TableCell></TableRow>
            ) : data?.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center">No services.</TableCell></TableRow>
            ) : (
              data?.map((service: any) => (
                <TableRow key={service.id}>
                  <TableCell className="font-bold">{service.name}</TableCell>
                  <TableCell className="capitalize">{service.category.replace('_', ' ')}</TableCell>
                  <TableCell>{service.startingPrice ? `Ksh ${service.startingPrice.toLocaleString()}` : 'Custom'}</TableCell>
                  <TableCell>
                    {service.isActive ? <Badge className="bg-black text-white">Active</Badge> : <Badge variant="outline">Inactive</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Edit</Button>
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
