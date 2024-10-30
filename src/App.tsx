import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { KeyboardPage } from '@/pages/KeyboardPage';
import { About } from '@/pages/About';
import { Privacy } from '@/pages/Privacy';
import { Terms } from '@/pages/Terms';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/404';
import { languages } from '@/data/languages';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import './App.css';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <Router>
          <div className="app-container">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Breadcrumbs />
              <Routes>
                <Route path="/" element={<Home />} />
                {languages.map((lang) => (
                  <Route
                    key={lang.code}
                    path={`/${lang.name.toLowerCase()}-online-keyboard`}
                    element={<KeyboardPage defaultLanguage={lang.code} />}
                  />
                ))}
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}