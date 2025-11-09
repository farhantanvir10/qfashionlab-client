import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import box from "../assets/box.jpg";
import leaf from "../assets/leaf.jpg";
import mesh from "../assets/mesh.jpg";
import pp from "../assets/pp.jpg";
import honey from "../assets/honeycomb.jpeg";

const ImageSlider = () => {
  const images = [box, leaf, mesh, pp, honey];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [direction, setDirection] = useState(1); // For slide direction

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(0);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => setCurrentIndex(index);

  // 🔁 Auto-slide every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isPaused, currentIndex]); // ✅ Depends on currentIndex so it smoothly cycles

  // 👆 Swipe detection
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    setTouchStartX(null);
  };

  // 🎞 Framer Motion animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 0 : 0,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 1 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image container */}
      <div className="flex relative w-full h-full overflow-hidden">
        <AnimatePresence custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Q Fashion Lab Slide ${currentIndex + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="w-full h-full object-cover rounded-lg"
          />
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-2 p-2 items-center justify-center overflow-hidden">
        <button
          className="flex items-center justify-center w-5 h-5 pb-0.5 rounded-full bg-[#1E3A5F] hover:bg-[#00A8CC]"
          onClick={prevSlide}
        >
          &#8249;
        </button>

        {/* Indicators */}
        <div className="flex items-center justify-center p-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full mx-2 cursor-pointer ${
                index === currentIndex ? "bg-[#00A8CC]" : "bg-[#1E3A5F]"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <button
          className="flex items-center justify-center w-5 h-5 pb-0.5 rounded-full bg-[#1E3A5F] hover:bg-[#00A8CC]"
          onClick={nextSlide}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
