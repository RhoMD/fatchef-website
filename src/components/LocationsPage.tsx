import { LOCATION_COUNT_WORD_TITLE } from '../data/forestHill';
import React from 'react';
import Locations from './Locations';
import ReviewCarousel from './ReviewCarousel';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './LocationsPage.css';

function LocationsPage() {
  useDocumentTitle('Locations — FAT CHEF');

  return (
    <div className="locations-page">
      <header className="locations-page-header">
        <h1>Find Your FAT CHEF</h1>
        <p>{LOCATION_COUNT_WORD_TITLE} locations across Victoria. Drop in, book ahead, or order online.</p>
      </header>

      <Locations showReviews />
    </div>
  );
}

export default LocationsPage;
export { ReviewCarousel };
