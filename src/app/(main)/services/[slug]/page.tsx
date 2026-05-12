import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Placeholder data
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href="/services" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-12">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Services
      </Link>

      <div className="mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-4">Website Development</span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Corporate Website</h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Establish a powerful online presence with a custom-designed, highly performant corporate website tailored to your brand identity and business goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
          <div className="bg-gray-100 px-6 py-3 rounded-lg text-sm font-semibold">Starting at Ksh 50,000</div>
          <div className="bg-gray-100 px-6 py-3 rounded-lg text-sm font-semibold">Timeline: 2-4 Weeks</div>
        </div>
        <Button size="lg" className="bg-black text-white hover:bg-gray-900 w-full sm:w-auto" asChild>
          <Link href="/contact?service=corporate-website">Request this service</Link>
        </Button>
      </div>

      <div className="prose prose-gray max-w-none">
        <h2>What's included</h2>
        <ul className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-12">
          {['Responsive UI/UX Design', 'SEO Optimization', 'CMS Integration', 'Fast Page Loads', 'Analytics Setup', '1 Month Free Support'].map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <h2>Our Process</h2>
        <p>We start with a thorough discovery phase to understand your objectives...</p>
        {/* Placeholder text */}
      </div>
    </div>
  );
}
