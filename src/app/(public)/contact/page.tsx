"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContactSchema } from '@/lib/validators/contact';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { apiClient } from '@/lib/api/client';
import { SITE_CONFIG } from '@/lib/config';

type ContactFormValues = z.infer<typeof createContactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(createContactSchema) as any,
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      message: '',
      source: 'website',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiClient.post('/contacts', data);
      toast({
        title: "Message Sent",
        description: "We've received your inquiry and will be in touch shortly.",
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: error.response?.data?.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Let's build something great.</h1>
          <p className="text-xl text-gray-600 mb-12">
            Fill out the form and our team will get back to you within 24 hours. Or reach out directly via our contact details.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email Us</h4>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-gray-600 hover:text-black hover:underline">{SITE_CONFIG.contact.email}</a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Call Us</h4>
                <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-black hover:underline">{SITE_CONFIG.contact.phone}</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                <p className="text-gray-600">{SITE_CONFIG.contact.address}<br/>(Remote-first agency)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" {...form.register('fullName')} className={form.formState.errors.fullName ? 'border-gray-900 ring-1 ring-gray-900' : ''} />
                {form.formState.errors.fullName && <p className="text-xs text-gray-600 font-medium">{form.formState.errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company (Optional)</Label>
                <Input id="companyName" {...form.register('companyName')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" {...form.register('email')} className={form.formState.errors.email ? 'border-gray-900 ring-1 ring-gray-900' : ''} />
                {form.formState.errors.email && <p className="text-xs text-gray-600 font-medium">{form.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (+254...)</Label>
                <Input id="phone" {...form.register('phone')} />
                {form.formState.errors.phone && <p className="text-xs text-gray-600 font-medium">{form.formState.errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea 
                id="message" 
                rows={5} 
                placeholder="Please tell us about your project requirements..."
                {...form.register('message')} 
                className={form.formState.errors.message ? 'border-gray-900 ring-1 ring-gray-900' : ''}
              />
              {form.formState.errors.message && <p className="text-xs text-gray-600 font-medium">{form.formState.errors.message.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900 h-12 text-base" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Send Message
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
