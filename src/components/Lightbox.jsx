import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index);
  const [direction, setDirection] = useState(0);

  useEffect(() => setCurrent(index), [index]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent(c => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent(c => (c + 1) % images.length);
  }, [images.length]);

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
          <AnimatePresence initial={false} custom={direction}>
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
        </div>
      </div>
    </motion.div>
  );
}
