import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">About</h3>
            <p className="text-muted-foreground">
              MultiKeyboard is a free online tool that lets you type in multiple languages
              using your physical keyboard or our virtual keyboard interface.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <p className="text-muted-foreground">
              Have questions or suggestions? We'd love to hear from you.
            </p>
            <a
              href="mailto:contact@multikeyboard.com"
              className="text-primary hover:text-primary/90 mt-2 inline-block"
            >
              contact@multikeyboard.com
            </a>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {currentYear} MultiKeyboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}