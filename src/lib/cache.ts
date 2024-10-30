import { languages } from '@/data/languages';

const CACHE_VERSION = 1;
const CACHE_PREFIX = 'mk_';

// Cache duration in milliseconds
const CACHE_DURATION = {
  static: 7 * 24 * 60 * 60 * 1000,  // 7 days
  dynamic: 24 * 60 * 60 * 1000,     // 1 day
};

interface CacheEntry<T> {
  value: T;
  timestamp: number;
  expires: number;
}

export function getCacheKey(key: string): string {
  return `${CACHE_PREFIX}${CACHE_VERSION}_${key}`;
}

export function setCachedData<T>(key: string, value: T, isDynamic = false): void {
  try {
    const cacheKey = getCacheKey(key);
    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      expires: Date.now() + (isDynamic ? CACHE_DURATION.dynamic : CACHE_DURATION.static),
    };
    localStorage.setItem(cacheKey, JSON.stringify(entry));
  } catch (error) {
    console.error('Failed to cache data:', error);
  }
}

export function getCachedData<T>(key: string): T | null {
  try {
    const cacheKey = getCacheKey(key);
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return null;
    
    const entry: CacheEntry<T> = JSON.parse(cached);
    
    if (Date.now() > entry.expires) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return entry.value;
  } catch (error) {
    console.error('Failed to retrieve cached data:', error);
    return null;
  }
}

export function clearCache(): void {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
}

export function prefetchRoutes(): void {
  const routes = [
    '/',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
    ...languages.map(lang => `/${lang.name.toLowerCase()}-online-keyboard`),
  ];

  routes.forEach(route => {
    const key = `route_${route}`;
    if (!getCachedData(key)) {
      setCachedData(key, { prefetched: true }, true);
    }
  });
}