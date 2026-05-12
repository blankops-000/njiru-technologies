import Image from 'next/image';
import { CheckCircle2, Shield, Zap, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-4">About Us</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Building the future of Kenyan tech.</h1>
          <p className="text-xl text-gray-600 mb-6">
            Njiru Technologies was founded with a single mission: to provide world-class software engineering services to businesses scaling in the modern economy.
          </p>
          <p className="text-gray-600">
            We believe that premium digital experiences shouldn't be a luxury. Through lean methodologies, rigorous engineering standards, and a stark focus on usability, we deliver systems that are both beautiful and incredibly robust.
          </p>
        </div>
        <div className="aspect-square bg-white rounded-3xl border border-gray-200 flex items-center justify-center relative overflow-hidden shadow-inner">
          <Image 
            src="/njiru-tech-logo.jpeg" 
            alt="Njiru Technologies Logo" 
            fill
            className="object-contain p-8"
            priority
          />
        </div>
      </div>

      {/* Why Us */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Why Njiru Technologies?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <Zap className="w-8 h-8 mb-6 text-black" />
            <h3 className="text-xl font-bold mb-3">Scalable & Fast</h3>
            <p className="text-gray-600 text-sm">We build on top of modern stacks like Next.js, React Native, and PostgreSQL. Your product is built to handle millions of users from day one.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <Shield className="w-8 h-8 mb-6 text-black" />
            <h3 className="text-xl font-bold mb-3">Secure & Compliant</h3>
            <p className="text-gray-600 text-sm">Security isn't an afterthought. We implement encryption, strict rate limiting, and adhere to the Kenya Data Protection Act standards.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <Target className="w-8 h-8 mb-6 text-black" />
            <h3 className="text-xl font-bold mb-3">Professional Standard</h3>
            <p className="text-gray-600 text-sm">No cut corners. Every line of code, every pixel is deliberate. We deliver a premium experience that wows your users.</p>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-black text-white rounded-3xl p-12 text-center">
        <h2 className="text-2xl font-bold mb-8">Trusted Standards</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">Registered Business in Kenya</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">DPA Compliant Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">100% In-house Engineering</span>
          </div>
        </div>
      </div>
    </div>
  );
}
