import { FileText, Shield, Scale } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export function Terms() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions - MultiKeyboard",
    "description": "Terms and conditions for using MultiKeyboard's online multilingual typing service."
  };

  return (
    <>
      <SEOHead
        title="Terms and Conditions - MultiKeyboard"
        description="Read our terms and conditions for using MultiKeyboard's online multilingual typing service."
        keywords="terms and conditions, user agreement, legal terms, keyboard usage terms"
        canonicalUrl="https://multikeyboard.com/terms"
        structuredData={structuredData}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Scale className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms and Conditions</h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using our service
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using MultiKeyboard, you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily use this website for personal, non-commercial
            transitory viewing only.
          </p>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on MultiKeyboard's website are provided on an 'as is' basis.
            MultiKeyboard makes no warranties, expressed or implied, and hereby disclaims and
            negates all other warranties including, without limitation, implied warranties or
            conditions of merchantability, fitness for a particular purpose, or non-infringement
            of intellectual property or other violation of rights.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall MultiKeyboard or its suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit, or due to
            business interruption) arising out of the use or inability to use the materials
            on MultiKeyboard's website.
          </p>

          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on MultiKeyboard's website could include technical,
            typographical, or photographic errors. MultiKeyboard does not warrant that any of
            the materials on its website are accurate, complete, or current.
          </p>

          <h2>6. Links</h2>
          <p>
            MultiKeyboard has not reviewed all of the sites linked to its website and is not
            responsible for the contents of any such linked site. The inclusion of any link
            does not imply endorsement by MultiKeyboard of the site.
          </p>

          <h2>7. Modifications</h2>
          <p>
            MultiKeyboard may revise these terms of service for its website at any time
            without notice. By using this website, you are agreeing to be bound by the then
            current version of these terms of service.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with
            applicable laws, and you irrevocably submit to the exclusive jurisdiction of
            the courts in that location.
          </p>
        </div>
      </div>
    </>
  );
}