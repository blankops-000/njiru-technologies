import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.metadata.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: './',
  },
  keywords: [
    'software engineering Kenya', 
    'web development Nairobi', 
    'mobile apps Nairobi', 
    'AI automation Kenya', 
    'Njiru Technologies',
    'digital transformation Nairobi',
    'custom software solutions Kenya'
  ],
  authors: [{ name: 'Njiru Technologies Team' }],
  creator: 'Njiru Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: SITE_CONFIG.metadata.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.metadata.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.metadata.ogImage],
    creator: '@njirutech',
  },
  icons: {
    icon: SITE_CONFIG.metadata.ogImage,
    apple: SITE_CONFIG.metadata.ogImage,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.metadata.url,
    logo: `${SITE_CONFIG.metadata.url}${SITE_CONFIG.metadata.ogImage}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.contact.phone,
      contactType: 'customer service',
      areaServed: 'KE',
      availableLanguage: 'en',
    },
    sameAs: [
      SITE_CONFIG.socials.instagram,
    ],
  };

  return (
    <html lang="en" className="font-sans">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
