import { generateSitemap } from '@/utils/sitemap';

export async function GET() {
  const sitemap = generateSitemap('https://multikeyboard.com');
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}