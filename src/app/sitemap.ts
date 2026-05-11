import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { SITE_CONFIG } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.metadata.url;

  // Static routes
  const routes = [
    '',
    '/services',
    '/portfolio',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic blog posts
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
  });

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic services
  const services = await prisma.service.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  });

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes, ...serviceRoutes];
}
