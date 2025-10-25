import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/SectionTitle.jsx";
import GalleryCard from "../components/GalleryCard.jsx";

function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);
  const [direction, setDirection] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => setCurrent(index), [index]);
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 300);
    return () => clearTimeout(timer);
  }, [current]);

  const handlePrev = useCallback(() => { setDirection(-1); setCurrent(c => (c - 1 + images.length) % images.length); }, [images.length]);
  const handleNext = useCallback(() => { setDirection(1); setCurrent(c => (c + 1) % images.length); }, [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev, onClose]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  const { fbLink } = images[current];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="max-w-[1200px] w-full relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-md ring-1 ring-white/10 z-20" aria-label="Zamknij">✕</button>
        <button onClick={handlePrev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-md ring-1 ring-white/10 z-20" aria-label="Poprzednie zdjęcie">◀</button>
        <button onClick={handleNext} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md ring-1 ring-white/10 z-20" aria-label="Następne zdjęcie">▶</button>

        <div className="w-full aspect-[16/9] overflow-hidden rounded-md relative">
          <AnimatePresence custom={direction} initial={false}>
            <motion.img
              key={current}
              src={images[current].src}
              alt={`Zdjęcie ${current + 1}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full object-contain absolute top-0 left-0"
              loading="lazy"
            />
          </AnimatePresence>

          {showButton && (
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 z-20">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-12 h-8 rounded overflow-hidden border-2 ${i === current ? "border-white" : "border-transparent"}`}
                >
                  <img src={img.src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {showButton && fbLink && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <a
                href={fbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition"
              >
                Zobacz album na Facebooku
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const images = [
  { src: "/caroseryjni-portfolio/images/caroseryjni_portfolio_fotografia_motoryzacyjna1.jpg", fbLink: "https://facebook.com/album1" },
  { src: "/caroseryjni-portfolio/images/caroseryjni_portfolio_fotografia_motoryzacyjna2.webp", fbLink: "https://facebook.com/album2" },
  { src: "/caroseryjni-portfolio/images/caroseryjni_portfolio_fotografia_motoryzacyjna3.jpg", fbLink: "https://facebook.com/album3" },
  { src: "/caroseryjni-portfolio/images/caroseryjni_portfolio_fotografia_motoryzacyjna4.webp", fbLink: "https://facebook.com/album4" },
  { src: "/caroseryjni-portfolio/images/caroseryjni_portfolio_fotografia_motoryzacyjna5.jpg", fbLink: "https://facebook.com/album5" },
  { src: "/caroseryjni-portfolio/images/caroseryjni_portfolio_fotografia_motoryzacyjna6.jpg", fbLink: "https://facebook.com/album6" },
];


  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section id="portfolio" className="max-w-6xl mx-auto px-5 py-20">
      <SectionTitle title="Portfolio" subtitle="Klasyczne samochody. Wybrane sesje." />
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, i) => (
          <GalleryCard key={i} image={image} i={i} onOpen={() => setLightboxIndex(i)} />
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
