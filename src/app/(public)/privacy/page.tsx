import { SITE_CONFIG } from '@/lib/config';

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Privacy Policy</h1>
          <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 text-zinc-600 dark:text-zinc-400">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">1. Introduction</h2>
            <p>
              Welcome to {SITE_CONFIG.name}. We are committed to protecting your personal information and your right to privacy. 
              If you have any questions or concerns about this privacy notice, or our practices with regards to your personal 
              information, please contact us at {SITE_CONFIG.contact.email}.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining 
              information about us or our products and services, when you participate in activities on the Website or 
              otherwise when you contact us.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Data:</strong> Name, email address, phone number, and company name.</li>
              <li><strong>Financial Data:</strong> M-Pesa transaction details (where applicable).</li>
              <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our Website for a variety of business purposes described below. 
              We process your personal information for these purposes in reliance on our legitimate business interests, 
              in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and manage our services.</li>
              <li>To communicate with you regarding projects and inquiries.</li>
              <li>To process payments via M-Pesa or other financial services.</li>
              <li>To improve our website functionality and user experience.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">4. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the 
              security of any personal information we process. However, despite our safeguards and efforts to secure 
              your information, no electronic transmission over the Internet or information storage technology can be 
              guaranteed to be 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">5. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, you may email us at {SITE_CONFIG.contact.email} or by post to:
            </p>
            <address className="not-italic">
              {SITE_CONFIG.legalName}<br />
              {SITE_CONFIG.contact.address}<br />
              Kenya
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
