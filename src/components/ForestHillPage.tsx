import React from 'react';
import { FOREST_HILL } from '../data/forestHill';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './ForestHillPage.css';

export default function ForestHillPage({ mode }: { mode: 'menu' | 'promotion' }) {
  const menu = mode === 'menu';
  useDocumentTitle(`Forest Hill ${menu ? 'Menu' : 'Promotions'} - FAT CHEF`);

  return (
    <main className="forest-hill-page">
      <section className="forest-hill-card">
        <p className="forest-hill-eyebrow">FAT CHEF · FOREST HILL</p>
        <h1>{menu ? 'Forest Hill Menu' : 'Forest Hill Promotions'}</h1>
        <p className="forest-hill-intro">Find us at The Loft, on Level 3 of Forest Hill Chase.</p>
        <div className="forest-hill-note">
          <span className="forest-hill-placeholder-icon" aria-hidden="true">{menu ? '☰' : '✦'}</span>
          <h2>{menu ? 'Menu coming soon' : 'Promotions coming soon'}</h2>
          <p>{menu
            ? 'Our dine-in menu will be available here soon. For now, call our team for menu enquiries.'
            : 'Our latest promotions will appear here soon. Call our team to ask about current specials.'}</p>
        </div>
        <div className="forest-hill-actions">
          <a className="forest-hill-primary" href={`tel:${FOREST_HILL.phoneDigits}`}>Call {FOREST_HILL.phone}</a>
          <a href={FOREST_HILL.bookingUrl} target="_blank" rel="noopener noreferrer">Book a Table</a>
        </div>
        <address>{FOREST_HILL.address}</address>
        <a className="forest-hill-map" href={FOREST_HILL.mapsUrl} target="_blank" rel="noopener noreferrer">Opening hours & directions on Google Maps ↗</a>
        <p className="forest-hill-parking">Visiting The Loft? The Ground Floor (Red) Carpark offers direct lift access to Level 3.</p>
      </section>
    </main>
  );
}
