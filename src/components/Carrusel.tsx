"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from "./carrusel.module.css";

type CarouselProps = {
  images: { src: string; alt: string }[];
};

const Carrusel: React.FC<CarouselProps> = ({ images }) => {
  // Agregamos dos imágenes al principio y al final para la transición circular
  const [extendedImages] = useState([
    images[images.length - 1],
    ...images,
    images[0]
  ]);

  const [currentIndex, setCurrentIndex] = useState(1); // Iniciar con la primera imagen real
  const [transition, setTransition] = useState(true); // Control de transición

  const goToPrevious = () => {
    if (transition) {
      if (currentIndex === 1) {
        setTransition(false);
        setCurrentIndex(extendedImages.length - 2); // Volver a la última imagen real
      } else {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const goToNext = () => {
    if (transition) {
      if (currentIndex === extendedImages.length - 2) {
        setTransition(false);
        setCurrentIndex(1); // Volver a la primera imagen real
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  useEffect(() => {
    if (!transition) {
      const timer = setTimeout(() => {
        setTransition(true); // Reactivar la transición
      }, 600); // Tiempo de transición debe coincidir con el CSS
      return () => clearTimeout(timer);
    }
  }, [transition]);

  // Lógica para desactivar botones
  const isAtStart = currentIndex === 1;
  const isAtEnd = currentIndex === extendedImages.length - 2;

  return (
    <div className={styles.carousel}>
      <div
        className={`${styles.carouselInner} ${!transition ? styles.noTransition : ''}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedImages.map((image, index) => (
          <div key={index} className={styles.carouselItem}>
            <Image
              src={image.src}
              alt={image.alt}
              width={1920}
              height={1080}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        ))}
      </div>
      <button 
        onClick={goToPrevious} 
        className={`${styles.carouselControl} ${styles.prev}`} 
        disabled={isAtStart} // Desactivar cuando está en la primera imagen
      >
        ❮
      </button>
      <button 
        onClick={goToNext} 
        className={`${styles.carouselControl} ${styles.next}`} 
        disabled={isAtEnd} // Desactivar cuando está en la última imagen
      >
        ❯
      </button>
    </div>
  );
};

export default Carrusel;
