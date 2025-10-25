import { motion } from "framer-motion";

export default function GalleryCard({ image, i, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.05 }}
      className="rounded-lg overflow-hidden"
    >
      <button onClick={onOpen} className="group block w-full h-full focus:outline-none">
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img
            src={image.src}
            alt={`photo-${i}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </button>
    </motion.div>
  );
}
