import React from 'react';
import './Gallery.css';

function Gallery() {
  const images = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=400',  // Gym equipment
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400',  // Weight training
    'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&h=400',  // Treadmill area
    'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=500&h=400',  // Yoga/stretching
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&h=400',  // Strength training
    'https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?w=500&h=400'   // Cardio area
  ];

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">BETTER BEATS BEST</h1>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img 
              src={image} 
              alt={`Gym facility ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
