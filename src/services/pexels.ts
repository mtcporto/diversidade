'use server';

import { createClient, type ErrorResponse } from 'pexels';
import type { CommunityCategoryPT } from '@/types';

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// Keywords for Pexels API, in English for better results
const pexelsCategoryKeywords: Record<CommunityCategoryPT, { query: string, keywords: string[] }> = {
  'Indígena': { query: 'indigenous people Brazil', keywords: ['indigenous tribe Amazon', 'native Brazilian culture', 'tribal village South America'] },
  'Quilombola': { query: 'quilombola community Brazil', keywords: ['afro brazilian heritage', 'quilombo life', 'maroon settlement Brazil'] },
  'Artesãos': { query: 'Brazilian artisans', keywords: ['local handicrafts Brazil', 'craft market Brazil', 'handmade art Brazil'] },
  'Agrícola': { query: 'community farming Brazil', keywords: ['sustainable agriculture Brazil', 'local produce farm', 'rural cooperative Brazil'] },
  'Cultural': { query: 'Brazilian cultural center', keywords: ['local culture festival Brazil', 'folk art Brazil', 'community traditions Brazil'] },
  'Ambiental': { query: 'environmental conservation Brazil', keywords: ['eco community Brazil', 'nature reserve Brazil', 'Amazon rainforest protection'] },
  'Outra': { query: 'diverse community Brazil', keywords: ['social gathering Brazil', 'people together Brazil', 'community group'] },
};

interface PexelsServiceResponse {
  imageUrl?: string;
  queryUsed?: string;
}

export async function fetchImageFromPexels(
  communityName: string,
  category: CommunityCategoryPT
): Promise<PexelsServiceResponse> {
  if (!PEXELS_API_KEY) {
    console.warn('Pexels API key is not configured. Skipping Pexels image fetch.');
    return {};
  }

  const client = createClient(PEXELS_API_KEY);

  const tryFetch = async (query: string): Promise<string | undefined> => {
    try {
      console.log(`Fetching Pexels image with query: "${query}"`);
      const response = await client.photos.search({ query, per_page: 1, orientation: 'landscape', locale: 'pt-BR' });
      if ('photos' in response && response.photos.length > 0) {
        return response.photos[0].src.large2x || response.photos[0].src.original;
      }
      console.log(`No Pexels image found for query: "${query}"`);
      return undefined;
    } catch (error) {
      const err = error as ErrorResponse;
      console.error(`Error fetching Pexels image for query "${query}":`, err.error || err);
      return undefined;
    }
  };

  // Try with a more specific query using community name and category hint
  const specificQuery = `${communityName} ${pexelsCategoryKeywords[category]?.query || category}`;
  let imageUrl = await tryFetch(specificQuery);
  if (imageUrl) return { imageUrl, queryUsed: specificQuery };

  // If not found, try with general category query
  const categoryQuery = pexelsCategoryKeywords[category]?.query || category;
  imageUrl = await tryFetch(categoryQuery);
  if (imageUrl) return { imageUrl, queryUsed: categoryQuery };
  
  // If still not found, try with more general keywords for the category
  const fallbackKeywords = pexelsCategoryKeywords[category]?.keywords || pexelsCategoryKeywords['Outra'].keywords;
  for (const keyword of fallbackKeywords) {
    imageUrl = await tryFetch(keyword);
    if (imageUrl) return { imageUrl, queryUsed: keyword };
  }
  
  console.warn(`No Pexels image found for "${communityName}" or category "${category}" after multiple attempts.`);
  return {};
}
