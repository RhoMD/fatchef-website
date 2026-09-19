import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade'; // Add fade effect styles

import './PhotoGallery.css';

// import required modules
import { Autoplay, EffectFade } from 'swiper/modules'; // Import EffectFade

// Import images
import g1 from '../assets/g1.webp';
import g2 from '../assets/g2.webp';
import g3 from '../assets/g3.webp';
import g4 from '../assets/g4.webp';
import g5 from '../assets/g5.webp';
import g6 from '../assets/g6.webp';
import g7 from '../assets/g7.webp';
import g8 from '../assets/g8.webp';
import g9 from '../assets/g9.webp';
import g10 from '../assets/g10.webp';

const images = [
  { src: g1, alt: "A delicious dish from FAT CHEF restaurant" },
  { src: g2, alt: "A signature cocktail from FAT CHEF" },
  { src: g3, alt: "The cozy interior of FAT CHEF restaurant" },
  { src: g4, alt: "A close-up of a gourmet burger" },
  { src: g5, alt: "A platter of assorted grilled meats" },
  { src: g6, alt: "A fresh and vibrant salad" },
  { src: g7, alt: "A dessert platter with various sweets" },
  { src: g8, alt: "A shot of the restaurant's exterior" },
  { src: g9, alt: "A group of friends enjoying a meal at FAT CHEF" },
  { src: g10, alt: "A chef preparing a dish in the kitchen" }
];

// Distribute images into four groups for the four carousels
const images_large = [images[0], images[4], images[8]];
const images_small1 = [images[1], images[5], images[9]];
const images_small2 = [images[2], images[6]];
const images_medium = [images[3], images[7]];

const commonSwiperProps = {
  modules: [Autoplay, EffectFade], // Add EffectFade module
  slidesPerView: 1,
  loop: true,
  allowTouchMove: false,
  effect: 'fade' as const, // Set effect to fade
  speed: 1500, // Slow down the transition speed
};

export default function PhotoGallery() {
  return (
    <section id="gallery" className="pb-5">
      {/* The grid itself is outside the container to be full-width */}
      <div className="gallery-grid">
        {/* Large vertical carousel on the left */}
        <div className="gallery-item large-item">
          <Swiper
            {...commonSwiperProps}
            autoplay={{ delay: 7000, disableOnInteraction: false }} // Slower delay
          >
            {images_large.map((img, i) => (
              <SwiperSlide key={i}><img src={img.src} alt={img.alt} loading="lazy" /></SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Container for the right side */}
        <div className="right-column">
          {/* Top-right container for two small carousels */}
          <div className="top-right-row">
            <div className="gallery-item small-item">
              <Swiper
                {...commonSwiperProps}
                autoplay={{ delay: 8500, disableOnInteraction: false }} // Slower delay
              >
                {images_small1.map((img, i) => (
                  <SwiperSlide key={i}><img src={img.src} alt={img.alt} loading="lazy" /></SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="gallery-item small-item">
              <Swiper
                {...commonSwiperProps}
                autoplay={{ delay: 6500, disableOnInteraction: false }} // Slower delay
              >
                {images_small2.map((img, i) => (
                  <SwiperSlide key={i}><img src={img.src} alt={img.alt} loading="lazy" /></SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Bottom-right medium carousel */}
                      <div className="gallery-item medium-item">
                      <Swiper
                        {...commonSwiperProps}
                        autoplay={{ delay: 9000, disableOnInteraction: false }} // Slower delay
                      >
                        {images_medium.map((img, i) => (
                          <SwiperSlide key={i}><img src={img.src} alt={img.alt} loading="lazy" /></SwiperSlide>
                        ))}
                      </Swiper>
                    </div>        </div>
      </div>
    </section>
  );
}
