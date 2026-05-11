"use client";

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Professional mock posts to show when the database is empty
const MOCK_POSTS = [
  {
    id: '1',
    slug: 'scaling-digital-products-kenya',
    title: 'Scaling Digital Products in the Kenyan Market: A Technical Guide',
    excerpt: 'From connectivity challenges to mobile-first user behavior, we explore what it takes to build robust systems that scale in the modern Kenyan economy.',
    publishedAt: new Date().toISOString(),
    featuredImageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800',
    tags: ['Engineering', 'Kenya Tech']
  },
  {
    id: '2',
    slug: 'why-nextjs-is-king',
    title: 'Why Next.js is the King of Modern Web Development',
    excerpt: 'At Njiru Technologies, we prioritize speed and SEO. Discover why Next.js is our core framework for building premium client experiences.',
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    featuredImageUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Frontend']
  },
  {
    id: '3',
    slug: 'ai-automation-small-business',
    title: 'Leveraging AI Automation for Small Business Growth',
    excerpt: 'AI is no longer just for enterprises. Learn how we implement intelligent automation to help local businesses save time and reduce costs.',
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    featuredImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['AI', 'Automation']
  }
];

export default function BlogPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['blog', { page: 1, limit: 9 }],
    queryFn: async () => {
      const res = await apiClient.get('/blog?page=1&limit=9');
      return res.data.data;
    }
  });

  // Use mock posts if data is empty or loading fails for now
  const posts = data?.length > 0 ? data : MOCK_POSTS;

  return (
    <div className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium tracking-wide uppercase text-zinc-600 dark:text-zinc-400 mb-6">
          <Sparkles className="w-3 h-3" />
          <span>Latest Insights</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Journal</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          Deep dives into software engineering, architectural standards, and building scalable digital businesses in Nairobi and beyond.
        </p>
      </div>

      {isLoading && !posts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post: any) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
              <div className="aspect-[16/10] bg-gray-100 rounded-[2rem] mb-6 overflow-hidden relative border border-gray-200 group-hover:border-black transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1">
                 {post.featuredImageUrl ? (
                   <img src={post.featuredImageUrl} alt={post.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                 )}
                 <div className="absolute top-4 left-4 flex gap-2">
                    {post.tags?.map((tag: string) => (
                       <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest rounded-full text-black">
                          {tag}
                       </span>
                    ))}
                 </div>
              </div>
              <time className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-3">
                {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : 'Draft'}
              </time>
              <h3 className="text-2xl font-bold mb-3 group-hover:underline leading-tight line-clamp-2">{post.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">{post.excerpt}</p>
              <span className="text-sm font-black inline-flex items-center text-black uppercase tracking-wider group-hover:gap-4 transition-all">
                Read Article <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
