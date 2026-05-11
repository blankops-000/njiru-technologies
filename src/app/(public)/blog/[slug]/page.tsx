"use client";

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { use } from 'react';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const res = await apiClient.get(`/blog/${slug}`);
      return res.data.data;
    }
  });

  if (isLoading) {
    return (
      <div className="py-24 max-w-3xl mx-auto px-4">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-32 mb-12" />
        <Skeleton className="h-[400px] w-full rounded-2xl mb-12" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="py-24 max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/blog" className="text-gray-500 hover:text-black underline">Return to Journal</Link>
      </div>
    );
  }

  return (
    <div className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
      <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-12">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Journal
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm font-semibold text-gray-500 mb-6">
          <time>{post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Draft'}</time>
          {post.author && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{post.author.name}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">{post.title}</h1>
      </header>

      {post.featuredImageUrl && (
        <div className="aspect-[21/9] w-full bg-gray-100 rounded-2xl mb-12 overflow-hidden border border-gray-200">
          <img src={post.featuredImageUrl} alt={post.title} className="w-full h-full object-cover grayscale" />
        </div>
      )}

      {/* 
        We use Tailwind typography prose. 
        Note: We haven't installed @tailwindcss/typography. 
        For MVP without the plugin, we use custom basic styling.
      */}
      <div className="prose prose-gray max-w-none text-lg text-gray-800 leading-relaxed">
        {post.content ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        ) : (
          <p className="italic text-gray-500">No content available.</p>
        )}
      </div>
    </div>
  );
}
