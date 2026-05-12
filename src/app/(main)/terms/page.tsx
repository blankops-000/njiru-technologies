import { SITE_CONFIG } from '@/lib/config';

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Terms of Service</h1>
          <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12 text-zinc-600 dark:text-zinc-400">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or using the services provided by {SITE_CONFIG.legalName} ("Company", "we", "us", or "our"), 
              you agree to be bound by these Terms of Service. If you do not agree to all of these terms, 
              then you are expressly prohibited from using the services and must discontinue use immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Website and Services are our proprietary property and all source code, 
              databases, functionality, software, website designs, audio, video, text, photographs, and graphics 
              (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or 
              controlled by us or licensed to us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">3. User Representations</h2>
            <p>
              By using the Services, you represent and warrant that: (1) all registration information you submit will be true, 
              accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update 
              such registration information as necessary.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">4. Service Terms</h2>
            <p>
              Specific project timelines, deliverables, and payment structures will be outlined in separate service 
              agreements or proposals provided to the client. These terms apply generally to our digital platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">5. Governing Law</h2>
            <p>
              These Terms shall be governed by and defined following the laws of Kenya. {SITE_CONFIG.legalName} and 
              yourself irrevocably consent that the courts of Kenya shall have exclusive jurisdiction to resolve 
              any dispute which may arise in connection with these terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">6. Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the Services or to receive further information regarding 
              use of the Services, please contact us at:
            </p>
            <address className="not-italic font-bold text-black dark:text-white">
              {SITE_CONFIG.legalName}<br />
              Email: {SITE_CONFIG.contact.email}<br />
              Phone: {SITE_CONFIG.contact.phone}
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
