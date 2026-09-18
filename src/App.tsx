import { FOREST_HILL, FOREST_HILL_LIVE } from './data/forestHill';
import ForestHillPage from './components/ForestHillPage';
import React, { Suspense } from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import BookATable from './components/BookATable';
import BrandStory from './components/BrandStory';
import PromotionsTeaser from './components/PromotionsTeaser';
import BookCTABanner from './components/BookCTABanner';
import StickyMobileBar from './components/StickyMobileBar';
// import MenuSection from './components/MenuSection';
import Footer from './components/Footer';
import KeilorEastMenu from './components/KeilorEastMenu'; // Import the new component
import BallaratMenu from './components/BallaratMenu'; // Import the new component
import KeilorEastPromotion from './components/KeilorEastPromotion'; // Import the new component
import BallaratPromotion from './components/BallaratPromotion'; // Import the new component
import CarrumDownsMenu from './components/CarrumDownsMenu'; // Import the new component
import CarrumDownsPromotion from './components/CarrumDownsPromotion'; // Import the new component
import useDocumentTitle from './hooks/useDocumentTitle';
import AnalyticsTracker from './components/AnalyticsTracker';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import routing components
import { HashLink } from 'react-router-hash-link'; // Import HashLink

const PhotoGallery = React.lazy(() => import('./components/PhotoGallery'));
const LocationsStrip = React.lazy(() => import('./components/LocationsStrip'));
const LocationsPage = React.lazy(() => import('./components/LocationsPage'));

const HomePage = () => {
  useDocumentTitle("FAT CHEF - Never Trust A Skinny Chef");
  return (
    <>
      <HeroSection />
      <BookATable />
      <BrandStory />
      <main>
        <Suspense fallback={<div>Loading Photo Gallery...</div>}>
          <PhotoGallery />
        </Suspense>
        <PromotionsTeaser />
        <Suspense fallback={<div>Loading Locations...</div>}>
          <LocationsStrip />
        </Suspense>
      </main>
      <BookCTABanner />
    </>
  );
};

function App() {
  return (
    <Router> {/* Wrap the entire application with Router */}
      <AnalyticsTracker />
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/" onClick={() => window.scrollTo(0, 0)}>
              <span className="nav-wordmark">FAT CHEF</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#!" id="navbarLocationDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Locations
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarLocationDropdown">
                    <li><HashLink className="dropdown-item" to="/locations#keilor-east-location">FAT CHEF Keilor East</HashLink></li>
                    <li><HashLink className="dropdown-item" to="/locations#ballarat-location">FAT CHEF Ballarat</HashLink></li>
                    <li><HashLink className="dropdown-item" to="/locations#carrum-downs-location">FAT CHEF Carrum Downs</HashLink></li>
                    {FOREST_HILL_LIVE && <li><HashLink className="dropdown-item" to={`/locations#${FOREST_HILL.hashId}`}>{FOREST_HILL.name}</HashLink></li>}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#!" id="navbarMenuDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Menu
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarMenuDropdown">
                    <li><Link className="dropdown-item" to="/menu/keilor-east">FAT CHEF Keilor East</Link></li> {/* Use Link for routing */}
                    <li><Link className="dropdown-item" to="/menu/ballarat">FAT CHEF Ballarat</Link></li>
                    <li><Link className="dropdown-item" to="/menu/carrum-downs">FAT CHEF Carrum Downs</Link></li>
                    {FOREST_HILL_LIVE && <li><Link className="dropdown-item" to="/menu/forest-hill">{FOREST_HILL.name}</Link></li>}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#!" id="navbarPromotionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Promotion
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarPromotionDropdown">
                    <li><Link className="dropdown-item" to="/promotion/keilor-east">FAT CHEF Keilor East</Link></li>
                    <li><Link className="dropdown-item" to="/promotion/ballarat">FAT CHEF Ballarat</Link></li>
                    <li><Link className="dropdown-item" to="/promotion/carrum-downs">FAT CHEF Carrum Downs</Link></li>
                    {FOREST_HILL_LIVE && <li><Link className="dropdown-item" to="/promotion/forest-hill">{FOREST_HILL.name}</Link></li>}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#!" id="navbarOrderDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Order Online
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarOrderDropdown">
                    <li><a className="dropdown-item" href="https://www.ubereats.com/au/store/fat-chef-keilor-east/MGw4_kTaTZS6eC5ikFF9Ew?diningMode=DELIVERY&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMjE1NiUyMFVuaW9uJTIwUm9hZCUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMmU4Y2ZkODc3LTYyOWYtNTY4Yy02ZWViLTlmNGEzNTMyZmRhMyUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBLTM3Ljc3NDk5OSUyQyUyMmxvbmdpdHVkZSUyMiUzQTE0NC45MTU4NTYlN0Q%3D&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas" target="_blank" rel="noopener noreferrer">FAT CHEF Keilor East</a></li>
                    <li><a className="dropdown-item" href="https://www.ubereats.com/au/store/fatchef-ballarat/L0hw1TmYTH-YswXYcJ5V8Q?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas" target="_blank" rel="noopener noreferrer">FAT CHEF Ballarat</a></li>
                    <li><a className="dropdown-item" href="https://www.ubereats.com/store/fat-chef-neva-trust-a-skinny-chef/n5CGTibHTr6NVFu__HYbFA?diningMode=PICKUP" target="_blank" rel="noopener noreferrer">FAT CHEF Carrum Downs</a></li>
                  </ul>
                </li>
              </ul>
              <ul className="navbar-nav nav-cta-wrapper">
                <li className="nav-item dropdown">
                  <a className="nav-link nav-cta dropdown-toggle" href="#!" id="navbarBookDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Book a Table
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarBookDropdown">
                    <li><a className="dropdown-item" href="https://inline.app/booking/-Mpd7JG15ak_5in4-yoo:inline-live-2/-Mpd7JtCkSmw4lWeTeOD?language=en" target="_blank" rel="noopener noreferrer">FAT CHEF Keilor East</a></li>
                    <li><a className="dropdown-item" href="https://inline.app/booking/-MpdA6HeGgYZSaki4kNN:inline-live-2/-MpdA6vJ4vHs8l_eY5ZE" target="_blank" rel="noopener noreferrer">FAT CHEF Ballarat</a></li>
                    <li><a className="dropdown-item" href="https://inline.app/booking/-N4yy_yLsYeh5u1PXOnt:inline-live-2" target="_blank" rel="noopener noreferrer">FAT CHEF Carrum Downs</a></li>
                    {FOREST_HILL_LIVE && <li><a className="dropdown-item" href={FOREST_HILL.bookingUrl} target="_blank" rel="noopener noreferrer">{FOREST_HILL.name}</a></li>}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/locations" element={
            <Suspense fallback={<div>Loading Locations...</div>}>
              <LocationsPage />
            </Suspense>
          } />
          <Route path="/menu/keilor-east" element={<KeilorEastMenu />} />
          <Route path="/menu/ballarat" element={<BallaratMenu />} />
          <Route path="/menu/carrum-downs" element={<CarrumDownsMenu />} />
          <Route path="/promotion/keilor-east" element={<KeilorEastPromotion />} />
          <Route path="/promotion/ballarat" element={<BallaratPromotion />} />
          <Route path="/promotion/carrum-downs" element={<CarrumDownsPromotion />} />
          {/* Unlinked while FOREST_HILL_LIVE is false — preview only. */}
          <Route path="/menu/forest-hill" element={<ForestHillPage mode="menu" />} />
          <Route path="/promotion/forest-hill" element={<ForestHillPage mode="promotion" />} />
        </Routes>
        <Footer />
        <StickyMobileBar />
      </div>
    </Router>
  );
}

export default App;
