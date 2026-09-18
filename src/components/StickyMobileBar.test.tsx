import { FOREST_HILL_LIVE } from '../data/forestHill';
import React from 'react';
import { TextEncoder, TextDecoder } from 'util';
import { render, screen, fireEvent, within } from '@testing-library/react';
Object.assign(global, { TextEncoder, TextDecoder });
// CRA's Jest resolver predates React Router 7 package exports.
jest.mock('react-router-dom', () => jest.requireActual('react-router'), { virtual: true });
const { MemoryRouter, Link } = require('react-router-dom');
const StickyMobileBar = require('./StickyMobileBar').default;
jest.mock('../analytics', () => ({ logEvent: jest.fn() }));

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
  Object.defineProperty(window, 'matchMedia', { writable: true, value: () => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }) });
});
const mount = (path = '/') => render(<MemoryRouter initialEntries={[path]}><StickyMobileBar /><Link to="/menu/carrum-downs">Visit Carrum</Link><Link to="/">Home</Link></MemoryRouter>);

const PUBLISHED_STORES = ['Keilor East', 'Ballarat', 'Carrum Downs', ...(FOREST_HILL_LIVE ? ['Forest Hill'] : [])];

test.each(['Call', 'Book', 'Menu', 'Find'])('%s offers every published destination from home', label => {
  mount();
  fireEvent.click(screen.getByRole('button', { name: label }));
  const sheet = within(screen.getByRole('dialog'));
  const expected: Record<string, string[]> = {
    Call: ['tel:0393376385', 'tel:0353383188', 'tel:0397820618', 'tel:0398726636'],
    Book: ['-Mpd7JG15ak_5in4-yoo', '-MpdA6HeGgYZSaki4kNN', '-N4yy_yLsYeh5u1PXOnt', '/maps/reserve/v/dine/c/_FRoRZdyNho'],
    Menu: ['/menu/keilor-east', '/menu/ballarat', '/menu/carrum-downs', '/menu/forest-hill'],
    Find: ['Keilor%20East', 'Ballarat', 'Carrum%20Downs', 'Forest%20Hill'],
  };
  PUBLISHED_STORES.forEach((store, i) =>
    expect(sheet.getByRole('link', { name: `${label} — ${store}` }).getAttribute('href')).toContain(expected[label][i]));
  if (!FOREST_HILL_LIVE) {
    expect(sheet.queryByRole('link', { name: `${label} — Forest Hill` })).not.toBeInTheDocument();
  }
  fireEvent.click(sheet.getByRole('button', { name: 'Close location picker' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe('');
});

test.each(['/menu/ballarat', '/promotion/ballarat'])('uses route store and switches corresponding page: %s', path => {
  mount(path);
  expect(screen.getByRole('link', { name: 'Call — Ballarat' })).toHaveAttribute('href', 'tel:0353383188');
  fireEvent.click(screen.getByRole('button', { name: /Current location/ }));
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /Carrum Downs/ }));
  expect(screen.getByRole('link', { name: 'Call — Carrum Downs' })).toHaveAttribute('href', 'tel:0397820618');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Home' }));
  expect(screen.getByRole('button', { name: 'Call' })).toBeInTheDocument();
});

test('manual store selection applies all actions and route navigation overrides it', () => {
  mount();
  fireEvent.click(screen.getByRole('button', { name: /Choose a location/ }));
  fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /Ballarat/ }));
  expect(screen.getByRole('link', { name: 'Menu — Ballarat' })).toHaveAttribute('href', '/menu/ballarat');
  fireEvent.click(screen.getByRole('link', { name: 'Visit Carrum' }));
  expect(screen.getByRole('link', { name: 'Menu — Carrum Downs' })).toHaveAttribute('href', '/menu/carrum-downs');
});

test('backdrop and Escape dismiss the picker without selecting a store', () => {
  mount();
  fireEvent.click(screen.getByRole('button', { name: 'Call' }));
  fireEvent.click(screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Book' }));
  fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: true }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Call' })).toBeInTheDocument();
});


// Skipped while the fourth branch is hidden (FOREST_HILL_LIVE = false).
const whenForestHillLive = FOREST_HILL_LIVE ? test : test.skip;
whenForestHillLive.each(['/menu/forest-hill', '/promotion/forest-hill'])('Forest Hill routes select the fourth store: %s', path => {
  mount(path);
  expect(screen.getByRole('link', { name: 'Call — Forest Hill' })).toHaveAttribute('href', 'tel:0398726636');
  expect(screen.getByRole('link', { name: 'Book — Forest Hill' })).toHaveAttribute('href', 'https://www.google.com/maps/reserve/v/dine/c/_FRoRZdyNho?hl=en-AU');
  fireEvent.click(screen.getByRole('button', { name: /Current location/ }));
  expect(within(screen.getByRole('dialog')).getByRole('button', { name: /Forest Hill/ })).toHaveAttribute('aria-pressed', 'true');
});
