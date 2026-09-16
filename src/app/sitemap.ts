import { MetadataRoute } from 'next';
import ideasData from '@/data/ideas.json';
import { Idea } from '@/lib/types';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ideaverse1000.vercel.app';
  const ideas = ideasData as Idea[];

  const staticPages = [
    '',
    '/explore',
    '/saved',
    '/submit',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const ideaPages = ideas.map((idea) => ({
    url: `${baseUrl}/idea/${idea.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...ideaPages];
}
