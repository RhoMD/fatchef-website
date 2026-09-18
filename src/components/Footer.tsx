import { FOREST_HILL, FOREST_HILL_LIVE, LOCATION_COUNT_WORD } from '../data/forestHill';
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';
import logo from '../assets/logo.jpg';
import SocialLinks from './SocialLinks';

interface FooterLocation {
  name: string;
  address: string;
  phone: string;
  hashId: string;
  menuSlug: string;
  social: { facebook: string; instagram: string; tiktok: string };
}

const LOCATIONS: FooterLocation[] = [
  {
    name: 'FAT CHEF Keilor East',
    address: 'Unit 16/235 Milleara Rd,\nKeilor East VIC 3033',
    phone: '(03) 9337 6385',
    hashId: 'keilor-east-location',
    menuSlug: 'keilor-east',
    social: {
      facebook: 'https://www.facebook.com/share/1AKX6P4Ub7/?mibextid=wwXIfr',
      instagram:
        'https://www.instagram.com/fat_chef_keilor_east?igsh=MXY4ZWk1c2hsZ3RmMQ%3D%3D&utm_source=qr',
      tiktok: 'https://www.tiktok.com/@fatchefkeiloreast?_r=1&_t=ZS-9170qT65u6c',
    },
  },
  {
    name: 'FAT CHEF Ballarat',
    address: '1845 Sturt St, Alfredton VIC 3350\n(Bell Tower Inn)',
    phone: '(03) 5338 3188',
    hashId: 'ballarat-location',
    menuSlug: 'ballarat',
    social: {
      facebook: 'https://www.facebook.com/share/1ApphebqfK/?mibextid=wwXIfr',
      instagram:
        'https://www.instagram.com/fat_chef_ballarat?igsh=MTZrMXd4b282aHd4ag%3D%3D&utm_source=qr',
      tiktok: 'https://www.tiktok.com/@fatchefballarat?_r=1&_t=ZS-9170o89M1At',
    },
  },
  {
    name: 'FAT CHEF Carrum Downs',
    address: '1095 Frankston - Dandenong Rd,\nCarrum Downs VIC 3201',
    phone: '(03) 9782 0618',
    hashId: 'carrum-downs-location',
    menuSlug: 'carrum-downs',
    social: {
      facebook:
        'https://m.facebook.com/events/d41d8cd9/coffee-and-cards-at-the-fat-chef-in-carrum-downs/711836057252889/',
      instagram: 'https://www.instagram.com/fatchefcarrumdowns/?hl=en',
      tiktok: '',
    },
  },
  ...(FOREST_HILL_LIVE ? [{ name: FOREST_HILL.name, address: FOREST_HILL.venue + '\n' + FOREST_HILL.address, phone: FOREST_HILL.phone, hashId: FOREST_HILL.hashId, menuSlug: FOREST_HILL.slug, social: FOREST_HILL.social }] : []),
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <div className="container">
        <div className={`footer-grid footer-grid--${LOCATIONS.length}`}>
          {/* Brand column */}
          <div className="footer-brand">
            <img
              src={logo}
              alt="FAT CHEF Logo"
              className="footer-logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ cursor: 'pointer' }}
            />
            <p className="footer-tagline">Never Trust A Skinny Chef</p>
            <p className="footer-blurb">
              Modern Australian food, generous portions, {LOCATION_COUNT_WORD}{' '}
              family-friendly locations across Victoria.
            </p>
          </div>

          {/* Location columns */}
          {LOCATIONS.map((loc) => (
            <div key={loc.hashId} className="footer-location">
              <h4 className="footer-location-name">{loc.name}</h4>
              <p className="footer-address">
                {(FiMapPin as any)({ className: 'footer-icon' })}
                <span>{loc.address}</span>
              </p>
              <p className="footer-phone">
                {(FiPhone as any)({ className: 'footer-icon' })}
                <a href={`tel:${loc.phone}`}>{loc.phone}</a>
              </p>
              <div className="footer-location-links">
                <HashLink to={`/locations#${loc.hashId}`}>Hours & directions</HashLink>
                <span className="footer-sep">·</span>
                <Link to={`/menu/${loc.menuSlug}`}>Menu</Link>
              </div>
              <SocialLinks {...loc.social} />
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} FAT CHEF. All Rights Reserved.
          </p>
          <p className="footer-credit">
            Website by{' '}
            <a
              href="https://websitesfactory.com.au"
              target="_blank"
              rel="noopener noreferrer"
            >
              Websites Factory
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
