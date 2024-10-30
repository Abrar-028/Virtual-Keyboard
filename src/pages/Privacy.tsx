import { Shield, Lock, Eye, FileCheck } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export function Privacy() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - MultiKeyboard",
    "description": "MultiKeyboard's privacy policy explains how we protect your data and ensure your privacy while using our online keyboard service."
  };

  return (
    <>
      <SEOHead
        title="Privacy Policy - MultiKeyboard"
        description="Learn how MultiKeyboard protects your privacy and handles your data. Our service operates entirely within your browser with no data collection."
        keywords="privacy policy, data protection, online privacy, keyboard privacy, secure typing"
        canonicalUrl="https://multikeyboard.com/privacy"
        structuredData={structuredData}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Secure by Design</h3>
            <p className="text-muted-foreground">
              All processing happens in your browser
            </p>
          </div>
          <div className="text-center p-6">
            <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Tracking</h3>
            <p className="text-muted-foreground">
              We don't monitor your typing or usage
            </p>
          </div>
          <div className="text-center p-6">
            <FileCheck className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Data Storage</h3>
            <p className="text-muted-foreground">
              Your text is never saved or transmitted
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            This Privacy Policy explains how MultiKeyboard ("we", "us", or "our")
            collects, uses, and protects any information when you use our online
            keyboard service.
          </p>

          <h2>Information Collection</h2>
          <p>
            Our service operates entirely within your browser. We do not:
          </p>
          <ul>
            <li>Store any text you type</li>
            <li>Track your typing patterns</li>
            <li>Collect personal information</li>
            <li>Use cookies for tracking</li>
          </ul>

          <h2>Browser Storage</h2>
          <p>
            We may use local storage or session storage to save your language
            preferences and theme settings. This data never leaves your device.
          </p>

          <h2>Translation Service</h2>
          <p>
            When you use our translation feature, text is sent to Google's
            Translation API. This process is:
          </p>
          <ul>
            <li>Encrypted using HTTPS</li>
            <li>Only performed when you explicitly request translation</li>
            <li>Not stored or logged by our servers</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We do not integrate with any third-party services that could
            compromise your privacy. All functionality is handled locally in your
            browser, except for the optional translation feature.
          </p>

          <h2>Data Security</h2>
          <p>
            Since we don't collect or store any personal data, there is no risk
            of data breaches or unauthorized access to your information through
            our service.
          </p>

          <h2>Changes to Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will
            be posted on this page with an updated revision date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p>
            <a href="mailto:privacy@multikeyboard.com" className="text-primary hover:text-primary/90">
              privacy@multikeyboard.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}