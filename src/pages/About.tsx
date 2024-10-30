import { Shield, Globe2, Users, Lock, Rocket } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

export function About() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About MultiKeyboard",
    "description": "Learn about MultiKeyboard's mission to make multilingual typing accessible to everyone",
    "publisher": {
      "@type": "Organization",
      "name": "MultiKeyboard",
      "logo": {
        "@type": "ImageObject",
        "url": "https://multikeyboard.com/logo.png"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="About MultiKeyboard - Online Multilingual Typing Tool"
        description="Learn about MultiKeyboard's mission to make multilingual typing accessible to everyone. Our online keyboard supports 200+ languages."
        keywords="multilingual keyboard, online typing, language support, typing tool, virtual keyboard"
        canonicalUrl="https://multikeyboard.com/about"
        structuredData={structuredData}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">About MultiKeyboard</h1>
          <p className="text-xl text-muted-foreground">
            Making multilingual typing accessible to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <Globe2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">200+ Languages</h3>
            <p className="text-muted-foreground">
              Support for over 200 languages and writing systems
            </p>
          </div>
          <div className="text-center p-6">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Easy to Use</h3>
            <p className="text-muted-foreground">
              Intuitive interface for both beginners and experts
            </p>
          </div>
          <div className="text-center p-6">
            <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Privacy First</h3>
            <p className="text-muted-foreground">
              Your text never leaves your browser
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Our Mission</h2>
          <p>
            MultiKeyboard was created with a simple mission: to break down language
            barriers in digital communication. We believe that everyone should have
            easy access to tools that enable them to type in their preferred
            language, regardless of their keyboard layout or operating system.
          </p>

          <h2>Technical Roadmap</h2>
          <div className="not-prose">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Rocket className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">SEO Optimization</h3>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Implement dynamic sitemap generation for all keyboard pages</li>
                    <li>Add structured data markup for rich search results</li>
                    <li>Optimize meta tags and Open Graph data</li>
                    <li>Implement canonical URLs to prevent duplicate content</li>
                    <li>Create SEO-friendly URLs for all pages</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Security Enhancements</h3>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Implement Content Security Policy (CSP)</li>
                    <li>Add security headers (X-Frame-Options, X-Content-Type-Options)</li>
                    <li>Set up rate limiting for API endpoints</li>
                    <li>Implement input sanitization</li>
                    <li>Regular security audits and updates</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Performance Optimization</h3>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Implement lazy loading for keyboard layouts</li>
                    <li>Optimize images and assets</li>
                    <li>Set up CDN for static assets</li>
                    <li>Implement caching strategies</li>
                    <li>Regular performance monitoring and optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}