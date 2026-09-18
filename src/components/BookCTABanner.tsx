import { FOREST_HILL, FOREST_HILL_LIVE, LOCATION_COUNT_WORD } from '../data/forestHill';
import React, { useState } from 'react';
import { logEvent } from '../analytics';
import './BookCTABanner.css';

const BOOKING_LINKS = [
  {
    name: 'FAT CHEF Keilor East',
    url: 'https://inline.app/booking/-Mpd7JG15ak_5in4-yoo:inline-live-2/-Mpd7JtCkSmw4lWeTeOD?language=en',
  },
  {
    name: 'FAT CHEF Ballarat',
    url: 'https://inline.app/booking/-MpdA6HeGgYZSaki4kNN:inline-live-2/-MpdA6vJ4vHs8l_eY5ZE',
  },
  {
    name: 'FAT CHEF Carrum Downs',
    url: 'https://inline.app/booking/-N4yy_yLsYeh5u1PXOnt:inline-live-2',
  },
  ...(FOREST_HILL_LIVE ? [{ name: FOREST_HILL.name, url: FOREST_HILL.bookingUrl }] : []),
];

function BookCTABanner() {
  const [open, setOpen] = useState(false);

  return (
    <section className="book-cta-banner">
      <div className="book-cta-inner">
        <h2 className="book-cta-headline">Ready to dine?</h2>
        <p className="book-cta-sub">
          Reserve a table at any of our {LOCATION_COUNT_WORD} locations across Victoria.
        </p>
        <div
          className="book-cta-button-wrap"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            className="book-cta-button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={open}
          >
            Book a Table ▾
          </button>
          {open && (
            <div className="book-cta-dropdown" role="menu">
              {BOOKING_LINKS.map((b) => (
                <a
                  key={b.name}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-cta-dropdown-item"
                  onClick={() => logEvent('Booking', 'CTA Banner', b.name)}
                >
                  {b.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BookCTABanner;
