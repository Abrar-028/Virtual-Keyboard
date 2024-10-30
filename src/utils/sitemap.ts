import { languages } from '@/data/languages';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export async function generateSitemap(baseUrl: string): Promise<string> {
  const today = new Date().toISOString();
  
  const urls: SitemapURL[] = [
    { loc: `${baseUrl}`, lastmod: today, changefreq: 'daily', priority: 1.0 },
    { loc: `${baseUrl}/about`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/privacy`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
    { loc: `${baseUrl}/terms`, lastmod: today, changefreq: 'monthly', priority: 0.7 },
    { loc: `${baseUrl}/contact`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
  ];

  // Add keyboard pages
  languages.forEach(lang => {
    urls.push({
      loc: `${baseUrl}/${lang.name.toLowerCase()}-online-keyboard`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return xml;
}