import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  // Static content for MVP. Later can be populated from API using ISR
  const categories = ['All', 'Website', 'Mobile', 'AI & Automation', 'Branding', 'Packages'];
  
  const services = [
    { title: 'Corporate Website', category: 'Website', price: 'From Ksh 50k', desc: 'Professional online presence for your company.' },
    { title: 'E-commerce Platform', category: 'Website', price: 'From Ksh 80k', desc: 'Sell products online with a robust store.' },
    { title: 'iOS Application', category: 'Mobile', price: 'From Ksh 150k', desc: 'Native iOS app built with React Native/Swift.' },
    { title: 'Workflow Automation', category: 'AI & Automation', price: 'Custom', desc: 'Automate repetitive tasks and save hours.' },
  ];

  return (
    <div className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Our Services</h1>
        <p className="text-xl text-gray-600">
          Comprehensive digital solutions tailored to elevate your business in the modern economy.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
        {categories.map((cat, i) => (
          <Button key={i} variant={i === 0 ? "default" : "outline"} className={`rounded-full whitespace-nowrap ${i === 0 ? 'bg-black text-white' : 'text-gray-600'}`}>
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv, i) => (
          <Link href={`/services/detail`} key={i} className="group block">
            <div className="border border-gray-200 rounded-2xl p-6 h-full flex flex-col bg-white hover:shadow-lg transition-all hover:border-black">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">{srv.category}</span>
              <h3 className="text-xl font-bold mb-2 group-hover:underline">{srv.title}</h3>
              <p className="text-gray-600 text-sm flex-1 mb-6">{srv.desc}</p>
              <div className="font-semibold">{srv.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
