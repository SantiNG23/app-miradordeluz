import fs from 'fs';
import path from 'path';

export type GoogleReview = {
  id: string;
  name: string;
  subtitle?: string;
  text: string;
  rating: number;
  avatarUrl?: string;
  time?: number | null;
};

const CACHE_DIR = path.resolve('./.cache');
const CACHE_PATH = path.join(CACHE_DIR, 'google-reviews.json');
const TTL_MS = 1000 * 60 * 60; // 1 hora

function safeParseJson<T>(input: string | undefined): T | null {
  if (!input) return null;
  try {
    return JSON.parse(input) as T;
  } catch {
    return null;
  }
}

export async function fetchGoogleReviews(apiKey: string, placeId: string, maxReviews = 10): Promise<GoogleReview[]> {
  if (!apiKey || !placeId) {
    throw new Error('API key and Place ID are required');
  }

  // Leer cache si existe y no expiró
  try {
    if (fs.existsSync(CACHE_PATH)) {
      const raw = fs.readFileSync(CACHE_PATH, 'utf-8');
      const parsed = safeParseJson<{ fetchedAt: number; reviews: GoogleReview[] }>(raw);
      if (parsed && Date.now() - parsed.fetchedAt < TTL_MS) {
        return parsed.reviews.slice(0, maxReviews);
      }
    }
  } catch (err) {
    // ignore cache read errors but log
    // eslint-disable-next-line no-console
    console.warn('Could not read google reviews cache:', err);
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Google Places API error ${res.status}`);
  }

  const json = await res.json();

  const rawReviews: any[] = Array.isArray(json?.result?.reviews) ? json.result.reviews : [];

  const reviews: GoogleReview[] = rawReviews.slice(0, maxReviews).map((r, i) => {
    // profile_photo_url may be present; otherwise use photo_reference if available (not common in reviews)
    let avatar: string | undefined = undefined;
    if (r.profile_photo_url) {
      avatar = r.profile_photo_url;
    } else if (r.photos && Array.isArray(r.photos) && r.photos.length > 0 && r.photos[0].photo_reference) {
      avatar = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${r.photos[0].photo_reference}&key=${apiKey}`;
    }

    return {
      id: String(i + 1),
      name: r.author_name || 'Anónimo',
      subtitle: r.relative_time_description || '',
      text: r.text || '',
      rating: typeof r.rating === 'number' ? r.rating : 5,
      avatarUrl: avatar,
      time: r.time || null,
    };
  });

  // Escribir cache (no bloquear si falla)
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(CACHE_PATH, JSON.stringify({ fetchedAt: Date.now(), reviews }, null, 2), 'utf-8');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Could not write google reviews cache:', err);
  }

  return reviews;
}




