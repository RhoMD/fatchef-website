import { FOREST_HILL, FOREST_HILL_LIVE } from '../data/forestHill';
import React from 'react';
import { Link } from 'react-router-dom';
import { logEvent } from '../analytics';
import './PromotionsTeaser.css';

const STORES = [
  { name: 'Keilor East', slug: 'keilor-east' },
  { name: 'Ballarat', slug: 'ballarat' },
  { name: 'Carrum Downs', slug: 'carrum-downs' },
  ...(FOREST_HILL_LIVE ? [{ name: FOREST_HILL.shortName, slug: FOREST_HILL.slug }] : []),
];

function PromotionsTeaser() {
  return (
    <section className="chalkboard-section">
      <div className="chalkboard-frame">
        <div className="chalkboard">
          <h2 className="chalkboard-title">
            <span className="chalk-flourish">✦</span>
            This Month&apos;s Specials
            <span className="chalk-flourish">✦</span>
          </h2>
          <p className="chalkboard-body">
            Each store runs its own monthly offers.<br />
            Tap a store to see what&apos;s on right now.
          </p>
          <div className="chalkboard-buttons">
            {STORES.map((s) => (
              <Link
                key={s.slug}
                to={`/promotion/${s.slug}`}
                className="chalk-btn"
                onClick={() => logEvent('Navigation', 'Chalkboard Promo', s.name)}
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromotionsTeaser;
