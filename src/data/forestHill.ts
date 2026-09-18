// Verified against Google Maps and Forest Hill Chase on 2026-09-14.
// Hours conflict across listings; link to Google Maps until confirmed by the store.

// Publish switch for the fourth branch. While false, Forest Hill is absent from
// the nav, homepage, footer, locations page, promotions, mobile bar and copy.
// The /menu/forest-hill and /promotion/forest-hill routes stay reachable but
// unlinked, so the page can be previewed without announcing the branch.
// To publish: set this to true AND un-comment the Forest Hill JSON-LD plus the
// four-location meta description in public/index.html (static HTML, not React).
export const FOREST_HILL_LIVE: boolean = false;

// Location count used in site copy, derived from the switch above.
export const LOCATION_COUNT_WORD = FOREST_HILL_LIVE ? 'four' : 'three';
export const LOCATION_COUNT_WORD_TITLE = FOREST_HILL_LIVE ? 'Four' : 'Three';

export const FOREST_HILL = {
  slug: 'forest-hill',
  name: 'FAT CHEF Forest Hill',
  shortName: 'Forest Hill',
  address: 'Level 3, Shop 307/270 Canterbury Rd, Forest Hill VIC 3131',
  shortAddress: 'Level 3, Shop 307/270 Canterbury Rd',
  venue: 'The Loft at Forest Hill Chase',
  phone: '(03) 9872 6636',
  phoneDigits: '0398726636',
  menuPath: '/menu/forest-hill',
  hashId: 'forest-hill-location',
  placeId: 'ChIJuT_HmEs_1moRL7zdcaHng0M',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=FAT+CHEF+FOREST+HILL&query_place_id=ChIJuT_HmEs_1moRL7zdcaHng0M',
  bookingUrl: 'https://www.google.com/maps/reserve/v/dine/c/_FRoRZdyNho?hl=en-AU',
  hoursNote: 'Check current opening hours on Google Maps',
  social: { facebook: 'https://www.facebook.com/fatchefforesthill/', instagram: '', tiktok: '' },
};
