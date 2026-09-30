import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './CarrumDownsMenu.css';

const CarrumDownsMenu: React.FC = () => {
  useDocumentTitle('Carrum Downs Menu - FAT CHEF');

  return (
    <main className="carrum-menu-page">
      <header className="carrum-menu-header">
        <p className="carrum-menu-kicker">FAT CHEF CARRUM DOWNS</p>
        <h1>Food Menu</h1>
        <p>Big feeds, family favourites and plenty to share.</p>
      </header>

      <div className="carrum-menu-pages" aria-label="FAT CHEF Carrum Downs food menu">
        <figure className="carrum-menu-sheet">
          <img
            src="/assets/menu_carrum_downs_food_1.webp"
            alt="FAT CHEF Carrum Downs food menu page 1: breakfast, entree and burgers"
            loading="eager"
            fetchPriority="high"
          />
        </figure>

        <figure className="carrum-menu-sheet">
          <img
            src="/assets/menu_carrum_downs_food_2.webp"
            alt="FAT CHEF Carrum Downs food menu page 2: salads, pasta, mains, steaks, parmas, sharing platters, desserts and kids meals"
            loading="lazy"
          />
        </figure>
      </div>
    </main>
  );
};

export default CarrumDownsMenu;
