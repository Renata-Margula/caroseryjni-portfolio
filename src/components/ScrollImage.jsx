import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ScrollImage({ src, side = "left", i = 0 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

  const variants = {
    hidden: { opacity: 0, x: side === "left" ? -200 : 200 },
    visible: { opacity: 1, x: 0 },
  };

  if (inView) controls.start("visible");
  else controls.start("hidden");

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.8, delay: i * 0.2 }}
      className={`w-full md:w-2/3 my-16 ${
        side === "left" ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"
      }`}
    >
      <img
        src={src}
        alt={`photo-${i}`}
        className="w-full h-auto rounded-xl shadow-lg"
        loading="lazy"
      />
    </motion.div>
  );
}
