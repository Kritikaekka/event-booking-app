import React, { useState, useEffect } from 'react';

import image6 from '../image6.jpg';
import image5 from '../image5.jpg';
import image7 from '../image7.jpg';
import image8 from '../image8.jpg';

const images = [image6, image5, image7, image8];
  


export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '16px', marginBottom: '24px' }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          style={{
            width: '96%',
            borderRadius:15,
            height: '55%',
            
            objectFit: 'cover',
            position: 'absolute',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
      ))}
    </div>
  );
}
