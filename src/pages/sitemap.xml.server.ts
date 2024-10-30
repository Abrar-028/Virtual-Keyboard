import { generateSitemap } from '@/utils/sitemap';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sitemap = generateSitemap(url.origin);
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}