"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/lib/auth';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { loginSchema } from '@/lib/validators/auth';

type LoginValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginValues) => {
    setError(null);
    try {
      // Direct axios call (not using apiClient yet since we aren't logged in)
      const res = await axios.post('/api/v1/auth/login', data);
      const { accessToken, user } = res.data.data;
      
      // Auth context handles saving and redirect
      login(accessToken, user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials or server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-gray-200">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl font-bold tracking-tight">N-TECH ADMIN</CardTitle>
          <CardDescription>Sign in to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                {...form.register('email')} 
                className={form.formState.errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}
              />
              {form.formState.errors.email && <p className="text-xs text-red-500 font-medium">{form.formState.errors.email.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                {...form.register('password')} 
                className={form.formState.errors.password ? 'border-red-500 ring-1 ring-red-500' : ''}
              />
              {form.formState.errors.password && <p className="text-xs text-red-500 font-medium">{form.formState.errors.password.message}</p>}
            </div>

            {error && <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center font-medium">{error}</div>}

            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
