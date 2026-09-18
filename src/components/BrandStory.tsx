import { LOCATION_COUNT_WORD_TITLE } from '../data/forestHill';
import React from 'react';
import { Link } from 'react-router-dom';
import storefront from '../assets/storefront-keilor-east.jpg';
import { logEvent } from '../analytics';
import './BrandStory.css';

function BrandStory() {
  return (
    <section className="brand-story">
      <div className="brand-story-inner">
        <div className="brand-story-top">
          <div className="brand-story-image">
            <img
              src={storefront}
              alt="FAT CHEF Keilor East dining room"
              loading="lazy"
            />
          </div>
          <div className="brand-story-text">
            <h2 className="brand-story-eyebrow">FAT CHEF</h2>
            <h3 className="brand-story-headline">
              Modern Australian, made generously.
            </h3>
            <p className="brand-story-body">
              {LOCATION_COUNT_WORD_TITLE} Victoria locations. One generous welcome. Big plates,
              honest cooking and the kind of place where you stay for one
              more drink.
            </p>
            <div className="brand-story-ctas">
              <Link
                to="/menu/keilor-east"
                className="brand-story-btn brand-story-btn-primary"
                onClick={() => logEvent('Navigation', 'Brand Story', 'View Menu')}
              >
                View Menu
              </Link>
              <Link
                to="/locations"
                className="brand-story-btn brand-story-btn-outline"
                onClick={() => logEvent('Navigation', 'Brand Story', 'Find Us')}
              >
                Find Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandStory;
