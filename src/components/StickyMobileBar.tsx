import { FOREST_HILL, FOREST_HILL_LIVE } from '../data/forestHill';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiPhone, FiCalendar, FiBookOpen, FiMapPin } from 'react-icons/fi';
import { logEvent } from '../analytics';
import './StickyMobileBar.css';

const STORES = [
  // Each branch keeps its own contact and booking destination.
  { slug: 'keilor-east', name: 'Keilor East', address: 'Unit 16/235 Milleara Rd', phone: '0393376385', bookingUrl: 'https://inline.app/booking/-Mpd7JG15ak_5in4-yoo:inline-live-2/-Mpd7JtCkSmw4lWeTeOD?language=en' },
  { slug: 'ballarat', name: 'Ballarat', address: '1845 Sturt St, Alfredton', phone: '0353383188', bookingUrl: 'https://inline.app/booking/-MpdA6HeGgYZSaki4kNN:inline-live-2/-MpdA6vJ4vHs8l_eY5ZE' },
  { slug: 'carrum-downs', name: 'Carrum Downs', address: '1095 Frankston-Dandenong Rd', phone: '0397820618', bookingUrl: 'https://inline.app/booking/-N4yy_yLsYeh5u1PXOnt:inline-live-2' },
  ...(FOREST_HILL_LIVE ? [{ slug: FOREST_HILL.slug, name: FOREST_HILL.shortName, address: FOREST_HILL.shortAddress, phone: FOREST_HILL.phoneDigits, bookingUrl: FOREST_HILL.bookingUrl }] : []),
];
type Store = typeof STORES[number];
const ACTIONS = [
  { id: 'call', label: 'Call', title: 'Which location would you like to call?', category: 'Contact', icon: FiPhone },
  { id: 'book', label: 'Book', title: 'Where would you like to book a table?', category: 'Booking', icon: FiCalendar },
  { id: 'menu', label: 'Menu', title: 'Which menu would you like to see?', category: 'Navigation', icon: FiBookOpen },
  { id: 'find', label: 'Find', title: 'Which location would you like directions to?', category: 'Navigation', icon: FiMapPin },
] as const;
type Action = typeof ACTIONS[number]['id'];
type Picker = Action | 'switch' | null;

function destination(store: Store, action: Action) {
  if (action === 'call') return `tel:${store.phone}`;
  if (action === 'book') return store.bookingUrl;
  if (action === 'menu') return `/menu/${store.slug}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`FAT CHEF ${store.name}, ${store.address}, Victoria, Australia`)}`;
}

function StickyMobileBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const route = location.pathname.match(/^\/(menu|promotion)\/([^/]+)\/?$/);
  const routeStore = STORES.find(store => store.slug === route?.[2]);
  const [selection, setSelection] = useState<{ key: string; store: Store } | null>(null);
  const current = routeStore || (selection?.key === location.key ? selection.store : undefined);
  const [picker, setPicker] = useState<Picker>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => { setPicker(null); }, [location.key]);

  useEffect(() => {
    const sheet = dialog.current;
    if (!sheet || !picker) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    sheet.showModal();
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 761px)');
    const closeOnDesktop = () => { if (desktop.matches) setPicker(null); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      sheet.close();
      document.body.style.overflow = overflow;
      desktop.removeEventListener('change', closeOnDesktop);
      previousFocus?.focus();
    };
  }, [picker]);

  const choose = (store: Store, action?: Action) => {
    setSelection({ key: location.key, store });
    setPicker(null);
    if (action) {
      const config = ACTIONS.find(item => item.id === action)!;
      logEvent(config.category, 'Sticky Bar', `${config.label} - ${store.name}`);
    } else if (routeStore && route) {
      navigate(`/${route[1]}/${store.slug}`);
    }
  };

  const actionLink = (store: Store, action: Action, className: string, children: React.ReactNode) => {
    const props = { className, onClick: () => choose(store, action), 'aria-label': `${ACTIONS.find(item => item.id === action)!.label} — ${store.name}` };
    return action === 'menu'
      ? <Link {...props} to={destination(store, action)}>{children}</Link>
      : <a {...props} href={destination(store, action)} target={action === 'call' ? undefined : '_blank'} rel={action === 'call' ? undefined : 'noopener noreferrer'}>{children}</a>;
  };

  return (
    <>
      <nav className="sticky-mobile-bar" aria-label="Quick actions">
        <button className="smb-location" onClick={() => setPicker('switch')} aria-haspopup="dialog">
          {current ? <>Current location: <strong>{current.name}</strong><span>Change</span></> : <>Choose a location <span>{STORES.length} locations</span></>}
        </button>
        <div className="smb-actions">
          {ACTIONS.map(action => {
            const className = `smb-action${action.id === 'book' ? ' smb-action-primary' : ''}`;
            const content = <>{(action.icon as any)({ className: 'smb-icon', 'aria-hidden': true })}<span>{action.label}</span></>;
            return <React.Fragment key={action.id}>{current
              ? actionLink(current, action.id, className, content)
              : <button className={className} onClick={() => setPicker(action.id)} aria-haspopup="dialog">{content}</button>}
            </React.Fragment>;
          })}
        </div>
      </nav>
      <dialog ref={dialog} className="smb-sheet" aria-labelledby="smb-sheet-title" onCancel={() => setPicker(null)} onClick={event => { if (event.target === event.currentTarget) setPicker(null); }}>
        <div className="smb-sheet-content">
          <div className="smb-sheet-heading">
            <h2 id="smb-sheet-title">{picker === 'switch' ? 'Choose your location' : ACTIONS.find(action => action.id === picker)?.title}</h2>
            <button className="smb-close" onClick={() => setPicker(null)} aria-label="Close location picker" autoFocus>×</button>
          </div>
          <div className="smb-store-list">
            {STORES.map(store => {
              const content = <><span><strong>{store.name}</strong><small>{store.address}</small></span><span aria-hidden="true">{current?.slug === store.slug ? '✓' : '→'}</span></>;
              return <React.Fragment key={store.slug}>{picker && picker !== 'switch'
                ? actionLink(store, picker, 'smb-store', content)
                : <button className="smb-store" onClick={() => choose(store)} aria-pressed={current?.slug === store.slug}>{content}</button>}
              </React.Fragment>;
            })}
          </div>
        </div>
      </dialog>
    </>
  );
}

export default StickyMobileBar;
