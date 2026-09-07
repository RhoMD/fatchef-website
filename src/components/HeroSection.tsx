import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import './BookATable.css'; // Import styles for the button
import heroVideo from '../assets/hero.mp4';
import { logEvent } from '../analytics';

import heroPoster from '../assets/hero-poster.jpg';

const LOCATIONS = [
  {
    name: 'FAT CHEF Keilor East',
    label: 'Keilor East',
    menuPath: '/menu/keilor-east',
    bookingUrl:
      'https://inline.app/booking/-Mpd7JG15ak_5in4-yoo:inline-live-2/-Mpd7JtCkSmw4lWeTeOD?language=en',
  },
  {
    name: 'FAT CHEF Ballarat',
    label: 'Ballarat',
    menuPath: '/menu/ballarat',
    bookingUrl:
      'https://inline.app/booking/-MpdA6HeGgYZSaki4kNN:inline-live-2/-MpdA6vJ4vHs8l_eY5ZE',
  },
  {
    name: 'FAT CHEF Carrum Downs',
    label: 'Carrum Downs',
    menuPath: '/menu/carrum-downs',
    bookingUrl: 'https://inline.app/booking/-N4yy_yLsYeh5u1PXOnt:inline-live-2',
  },
];

type OpenMenu = 'book' | 'menu' | null;

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null); // which dropdown is open

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Touch devices never fire mouseleave, so close on any outside tap/click.
  useEffect(() => {
    if (!openMenu) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (ctasRef.current && !ctasRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [openMenu]);

  const toggle = (menu: Exclude<OpenMenu, null>) =>
    setOpenMenu((current) => (current === menu ? null : menu));

  return (
    <header className="hero-section">
      <video ref={videoRef} className="hero-video" autoPlay loop muted poster={heroPoster}>
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay">
        <div className="hero-content text-center">
          <h1 className="hero-title">FAT CHEF</h1>
          <p className="hero-tagline">Never Trust A Skinny Chef</p>

          <div className="hero-ctas" ref={ctasRef}>
          {/* Book a Table button moved here */}
          <div
            className="book-a-table-wrapper"
            onMouseEnter={() => setOpenMenu('book')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              className="book-a-table-button"
              onClick={() => toggle('book')}
              aria-haspopup="true"
              aria-expanded={openMenu === 'book'}
            >
              Book a Table
            </button>
            {openMenu === 'book' && (
              <div className="book-a-table-dropdown" role="menu">
                {LOCATIONS.map((loc) => (
                  <a
                    key={loc.name}
                    href={loc.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dropdown-item"
                    onClick={() => {
                      logEvent('Booking', 'Click', loc.label);
                      setOpenMenu(null);
                    }}
                  >
                    {loc.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div
            className="book-a-table-wrapper"
            onMouseEnter={() => setOpenMenu('menu')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              className="hero-view-menu-button"
              onClick={() => toggle('menu')}
              aria-haspopup="true"
              aria-expanded={openMenu === 'menu'}
            >
              View Menu
            </button>
            {openMenu === 'menu' && (
              <div className="book-a-table-dropdown" role="menu">
                {LOCATIONS.map((loc) => (
                  <Link
                    key={loc.name}
                    to={loc.menuPath}
                    className="dropdown-item"
                    onClick={() => {
                      logEvent('Navigation', 'Hero View Menu', loc.label);
                      setOpenMenu(null);
                    }}
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default HeroSection;
