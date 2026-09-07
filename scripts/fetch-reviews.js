#!/usr/bin/env node
/**
 * Fetch Google Places reviews for each FAT CHEF location.
 *
 * Uses Places API (New): https://developers.google.com/maps/documentation/places/web-service
 *
 * Input:   GOOGLE_PLACES_API_KEY env var
 * Output:  src/data/reviews.json  (committed to repo, consumed by ReviewCarousel)
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=xxx node scripts/fetch-reviews.js
 *
 * Run manually via .github/workflows/update-reviews.yml (Actions tab);
 * the monthly schedule was turned off 2026-09-07.
 */

const fs = require('fs');
const path = require('path');

const KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!KEY) {
  console.error('Missing GOOGLE_PLACES_API_KEY env var');
  process.exit(1);
}

const STORES = [
  { slug: 'keilor-east', query: 'FAT CHEF Keilor East, Milleara Road' },
  { slug: 'ballarat', query: 'FAT CHEF Ballarat, Alfredton, Bell Tower Inn' },
  { slug: 'carrum-downs', query: 'FAT CHEF Carrum Downs, Frankston Dandenong Road' },
];

const BASE = 'https://places.googleapis.com/v1';

async function searchPlace(query) {
  const res = await fetch(`${BASE}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress',
    },
    body: JSON.stringify({ textQuery: query, regionCode: 'AU' }),
  });
  if (!res.ok) throw new Error(`Text search failed (${res.status}): ${await res.text()}`);
  const data = await res.json();
  if (!data.places || data.places.length === 0) {
    throw new Error(`No places found for "${query}"`);
  }
  return data.places[0];
}

async function getPlaceDetails(placeId) {
  const res = await fetch(`${BASE}/places/${placeId}?languageCode=en`, {
    headers: {
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask':
        'displayName,formattedAddress,rating,userRatingCount,reviews,googleMapsUri',
    },
  });
  if (!res.ok) throw new Error(`Place details failed (${res.status}): ${await res.text()}`);
  return res.json();
}

const MIN_RATING = 4;

function compactReview(r) {
  return {
    author: r.authorAttribution?.displayName || 'Guest',
    authorPhoto: r.authorAttribution?.photoUri || null,
    rating: r.rating,
    text: r.text?.text || r.originalText?.text || '',
    timeAgo: r.relativePublishTimeDescription || '',
    publishTime: r.publishTime || null,
  };
}

function curateReviews(reviews) {
  return reviews
    .filter((r) => (r.rating || 0) >= MIN_RATING)
    .filter((r) => (r.text || '').length >= 30) // skip one-liners like "Good"
    .sort((a, b) => (b.publishTime || '').localeCompare(a.publishTime || ''));
}

async function main() {
  const out = { generatedAt: new Date().toISOString(), stores: {} };

  for (const store of STORES) {
    try {
      console.log(`→ ${store.slug}: searching "${store.query}"...`);
      const place = await searchPlace(store.query);
      console.log(`  found: ${place.displayName?.text} (id=${place.id})`);

      const details = await getPlaceDetails(place.id);
      const allReviews = (details.reviews || []).map(compactReview);
      const reviews = curateReviews(allReviews);

      out.stores[store.slug] = {
        placeId: place.id,
        name: details.displayName?.text,
        address: details.formattedAddress,
        rating: details.rating,
        userRatingCount: details.userRatingCount,
        mapsUri: details.googleMapsUri,
        reviews,
      };
      console.log(
        `  kept ${reviews.length}/${allReviews.length} reviews (rating>=${MIN_RATING}), avg ${details.rating} (${details.userRatingCount} ratings)`,
      );
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
      out.stores[store.slug] = { error: err.message, reviews: [] };
    }
  }

  const outPath = path.join(__dirname, '..', 'src', 'data', 'reviews.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  console.log(`\nWrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
