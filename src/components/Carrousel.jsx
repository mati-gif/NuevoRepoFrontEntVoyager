import React, { useState, useEffect } from 'react';
import image1 from "../assets/local2pisos.jpeg";
import image2 from "../assets/person-is-holding-large-hamburger-with-lettuce-tomato-burger-is-topped-with-ketchup_137441-16635.jpg";
import image3 from "../assets/menuImages/tasty-pub-burger_1030879-61968.avif"
const Carrousel = () => {
  const images = [image1, image2,image3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Función para saltar a un slide específico
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // useEffect para configurar el desplazamiento automático
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Cambia de slide cada 3 segundos

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [currentIndex]); // Solo se actualiza cuando cambia el índice actual

  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      <div className="relative h-96 overflow-hidden md:h-[100vh]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
            data-carousel-item
          >
            <img 
              src={image} 
              className="w-full h-full object-cover" 
              alt={`Slide ${index + 1}`} 
            />
            {/* Overlay con opacidad negra */}
            <div className="absolute top-0 left-0 w-full h-full"></div>
          </div>
        ))}
      </div>

      {/* Botones de navegación (círculos) */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-1 h-1 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
            aria-current={currentIndex === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      {/* Botón anterior */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className=" inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white">
          <svg className=" w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Anterior</span>
        </span>
      </button>

      {/* Botón siguiente */}
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white">
          <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Siguiente</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 focus:ring-4 focus:ring-white">
          <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Siguiente</span>
        </span>
      </button>
    </div>
  );
};

export default Carrousel;