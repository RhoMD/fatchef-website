import { FOREST_HILL, FOREST_HILL_LIVE } from '../data/forestHill';
import React from 'react';
import { Link } from 'react-router-dom';
import './Locations.css';
import { FiPhone } from 'react-icons/fi';
import SocialLinks from './SocialLinks';
import ReviewCarousel from './ReviewCarousel';
import { logEvent } from '../analytics';

// Define a type for the props for better type-checking and readability
interface LocationBlockProps {
  name: string;
  slug: string;
  address: string;
  phone: string;
  tradingHours: string;
  googleMapsLink: string;
  orderOnlineLink?: string;
  bookingUrl?: string;
  hoursUrl?: string;
  id?: string;
  showReviews?: boolean;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
}

const LocationBlock = ({ name, slug, address, phone, tradingHours, googleMapsLink, orderOnlineLink, id, socialLinks, showReviews, bookingUrl, hoursUrl }: LocationBlockProps) => (
  <>
  <div className="location-block" id={id}>
    {/* Map Placeholder Column (now a direct grid item) */}
    <div className="map-placeholder">
      <iframe
        title={`Google Map of ${name}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(name)}`}
      ></iframe>
    </div>

    {/* Location Details Column (now a direct grid item) */}
    <div className="location-details">
    <div className="location-name-bar">
      <h3 className="location-name">{name}</h3>
    </div>
    <SocialLinks {...socialLinks} />
      <div className="trading-hours">
        <p className="trading-hours-text">{hoursUrl ? <a href={hoursUrl} target="_blank" rel="noopener noreferrer">{tradingHours}</a> : tradingHours}</p>
      </div>
      <p className="location-address">{address}</p>
      <p className="location-phone">
        <a 
          href={`tel:${phone}`} 
          onClick={() => logEvent('Contact', 'Call', name)} 
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {(FiPhone as any)()} {phone}
        </a>
      </p>

      <div className="location-actions">
        <Link
          to={`/menu/${slug}`}
          className="location-action-btn location-action-primary"
          onClick={() => logEvent('Navigation', 'View Menu', name)}
        >
          View Menu
        </Link>
        <Link
          to={`/promotion/${slug}`}
          className="location-action-btn location-action-secondary"
          onClick={() => logEvent('Navigation', 'View Promotion', name)}
        >
          Promotions
        </Link>
        {bookingUrl && <a href={bookingUrl} className="location-action-btn location-action-secondary" target="_blank" rel="noopener noreferrer">Book a Table</a>}
        {orderOnlineLink && <a
          href={orderOnlineLink}
          className="location-action-btn location-action-secondary"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent('Order', 'Order Online', name)}
        >
          Order Online
        </a>}
        <a
          href={googleMapsLink}
          className="location-action-btn location-action-outline"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent('Navigation', 'Get Directions', name)}
        >
          Get Directions
        </a>
      </div>
    </div>
  </div>
  {showReviews && <ReviewCarousel storeSlug={slug} storeName={name} />}
  </>
);

interface LocationsProps {
  showReviews?: boolean;
}

function Locations({ showReviews }: LocationsProps = {}) {
  const locationsData: LocationBlockProps[] = [
    {
      name: "FAT CHEF Keilor East",
      slug: "keilor-east",
      address: "Unit 16/235 Milleara Rd, Keilor East VIC 3033",
      phone: "(03) 9337 6385",
      tradingHours: "Monday - Saturday: 8:00AM - 9:00PM\nSunday: 8:30AM - 9:00PM",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=FAT+CHEF+Keilor+East",
      orderOnlineLink: "https://www.ubereats.com/au/store/fat-chef-keilor-east/MGw4_kTaTZS6eC5ikFF9Ew",
      socialLinks: {
        facebook: "https://www.facebook.com/share/1AKX6P4Ub7/?mibextid=wwXIfr",
        instagram: "https://www.instagram.com/fat_chef_keilor_east?igsh=MXY4ZWk1c2hsZ3RmMQ%3D%3D&utm_source=qr",
        tiktok: "https://www.tiktok.com/@fatchefkeiloreast?_r=1&_t=ZS-9170qT65u6c"
      }
    },
    {
      name: "FAT CHEF Ballarat",
      slug: "ballarat",
      address: "1845 Sturt St, Alfredton VIC 3350\nLocated in: Bell Tower Inn",
      phone: "(03) 5338 3188",
      tradingHours: "Monday - Sunday: 5:00PM - 9:00PM",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=FAT+CHEF+Ballarat",
      orderOnlineLink: "https://www.ubereats.com/au/store/fatchef-ballarat/L0hw1TmYTH-YswXYcJ5V8Q",
      socialLinks: {
        facebook: "https://www.facebook.com/share/1ApphebqfK/?mibextid=wwXIfr",
        instagram: "https://www.instagram.com/fat_chef_ballarat?igsh=MTZrMXd4b282aHd4ag%3D%3D&utm_source=qr",
        tiktok: "https://www.tiktok.com/@fatchefballarat?_r=1&_t=ZS-9170o89M1At"
      }
    },
    {
      name: "FAT CHEF Carrum Downs",
      slug: "carrum-downs",
      address: "1095 Frankston - Dandenong Rd, Carrum Downs VIC 3201",
      phone: "(03) 9782 0618",
      tradingHours: "Monday - Sunday: 7:00 AM - 8:30 PM",
      orderOnlineLink: "https://www.ubereats.com/store/fat-chef-neva-trust-a-skinny-chef/n5CGTibHTr6NVFu__HYbFA?diningMode=PICKUP",
      googleMapsLink: "https://www.google.com/maps/place/FAT+CHEF+Carrum+Downs/@-38.088782,145.182943,1395m/data=!3m1!1e3!4m6!3m5!1s0x6ad60daa14c9e05b:0x848e50aa6e1a2a2e!8m2!3d-38.0887818!4d145.1829433!16s%2Fg%2F11fxwth9tf?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D",
      socialLinks: {
        facebook: "https://m.facebook.com/events/d41d8cd9/coffee-and-cards-at-the-fat-chef-in-carrum-downs/711836057252889/",
        instagram: "https://www.instagram.com/fatchefcarrumdowns/?hl=en",
        tiktok: ""
      }
    },
    ...(FOREST_HILL_LIVE ? [{ name: FOREST_HILL.name, slug: FOREST_HILL.slug, address: FOREST_HILL.venue + '\n' + FOREST_HILL.address, phone: FOREST_HILL.phone, tradingHours: FOREST_HILL.hoursNote, hoursUrl: FOREST_HILL.mapsUrl, googleMapsLink: FOREST_HILL.mapsUrl, bookingUrl: FOREST_HILL.bookingUrl, socialLinks: FOREST_HILL.social }] : []),
  ];

  const getLocationId = (index: number) => {
    switch(index) {
      case 0: return "keilor-east-location";
      case 1: return "ballarat-location";
      case 2: return "carrum-downs-location";
      case 3: return FOREST_HILL.hashId;
      default: return `location-${index}`;
    }
  };

  return (
    <section id="locations" className="pb-5" style={{ backgroundColor: '#faf7f2' }}>
        {locationsData.map((loc, index) => (
          <LocationBlock
            key={loc.name}
            {...loc}
            id={getLocationId(index)}
            showReviews={showReviews}
          />
        ))}
    </section>
  );
}

export default Locations;
