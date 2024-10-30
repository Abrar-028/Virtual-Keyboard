import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { languages } from '@/data/languages';
import { Keyboard, Search } from 'lucide-react';
import { useState } from 'react';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
          <Keyboard className="h-10 w-10 text-primary" />
          Multilingual Online Keyboard
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Type in multiple languages with our easy-to-use online keyboard
        </p>
        
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search keyboards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLanguages.map((lang) => (
          <Link
            key={lang.code}
            to={`/${lang.name.toLowerCase()}-online-keyboard`}
            className="transform transition-transform hover:scale-105"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-left">
                  <span className="text-2xl">{lang.flag}</span>
                  <span>{lang.name} Keyboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-left">
                  Type in {lang.name} with our virtual keyboard. Supports both
                  physical and on-screen typing.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
        
        {filteredLanguages.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No keyboards found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}