import { FOREST_HILL, FOREST_HILL_LIVE, LOCATION_COUNT_WORD_TITLE } from '../data/forestHill';
import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { FiMapPin } from 'react-icons/fi';
import { logEvent } from '../analytics';
import './LocationsStrip.css';

interface StripLocation {
  name: string;
  shortName: string;
  suburb: string;
  hours: string;
  hashId: string;
  rotate: number;       // polaroid tilt
  swatch: string;       // background color of the "photo" area
  pinColor: string;     // pushpin color
}

const LOCATIONS: StripLocation[] = [
  {
    name: 'FAT CHEF Keilor East',
    shortName: 'Keilor East',
    suburb: 'Unit 16/235 Milleara Rd',
    hours: 'Mon–Sat 8AM–9PM · Sun 8:30AM–9PM',
    hashId: 'keilor-east-location',
    rotate: -3,
    swatch: 'linear-gradient(135deg, #f4d790 0%, #e7c97f 100%)',
    pinColor: '#C84B31',
  },
  {
    name: 'FAT CHEF Ballarat',
    shortName: 'Ballarat',
    suburb: '1845 Sturt St, Alfredton',
    hours: 'Daily 5PM–9PM',
    hashId: 'ballarat-location',
    rotate: 2,
    swatch: 'linear-gradient(135deg, #d9886d 0%, #b87056 100%)',
    pinColor: '#3B2E2A',
  },
  {
    name: 'FAT CHEF Carrum Downs',
    shortName: 'Carrum Downs',
    suburb: '1095 Frankston-Dandenong Rd',
    hours: 'Daily 7AM–8:30PM',
    hashId: 'carrum-downs-location',
    rotate: -1,
    swatch: 'linear-gradient(135deg, #a8b687 0%, #8a9a6f 100%)',
    pinColor: '#C84B31',
  },
  ...(FOREST_HILL_LIVE ? [{ name: FOREST_HILL.name, shortName: FOREST_HILL.shortName, suburb: FOREST_HILL.shortAddress, hours: 'View location & opening hours', hashId: FOREST_HILL.hashId, rotate: 2, swatch: 'linear-gradient(135deg, #8eabb4 0%, #5c7d89 100%)', pinColor: '#3B2E2A' }] : []),
];

function LocationsStrip() {
  return (
    <section className="locations-strip" id="locations">
      <div className="locations-strip-header">
        <h2>Find Your FAT CHEF</h2>
        <p>{LOCATION_COUNT_WORD_TITLE} Victoria locations. One generous welcome.</p>
      </div>

      <div className={`locations-strip-grid locations-strip-grid--${LOCATIONS.length}`}>
        {LOCATIONS.map((loc) => (
          <HashLink
            key={loc.hashId}
            to={`/locations#${loc.hashId}`}
            smooth
            scroll={(el) => {
              const navHeight = 90;
              const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
              window.scrollTo({ top, behavior: 'smooth' });
            }}
            className="polaroid-card"
            style={{ '--tilt': `${loc.rotate}deg` } as React.CSSProperties}
            onClick={() => logEvent('Navigation', 'Locations Strip', loc.name)}
          >
            <span
              className="polaroid-pin"
              style={{ backgroundColor: loc.pinColor }}
              aria-hidden="true"
            />
            <div
              className="polaroid-photo"
              style={{ background: loc.swatch }}
            >
              <FiMapPin className="polaroid-photo-icon" />
              <span className="polaroid-photo-label">{loc.shortName}</span>
            </div>
            <div className="polaroid-caption">
              <h3 className="polaroid-name">{loc.name}</h3>
              <p className="polaroid-meta">
                {loc.suburb}
                <br />
                <span className="polaroid-hours">{loc.hours}</span>
              </p>
            </div>
          </HashLink>
        ))}
      </div>
    </section>
  );
}

export default LocationsStrip;
