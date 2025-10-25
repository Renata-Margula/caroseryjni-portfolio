import { useEffect, useRef } from "react";

export default function ParallaxHero({ image }) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const offset = Math.min(Math.max(-rect.top / 3, -100), 100);
          el.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const src = image?.src ?? image;

  return (
    <div className="absolute inset-0 -z-10">
      <div ref={ref} className="w-full h-[60vh] md:h-[80vh] transform transition-transform duration-300 will-change-transform">
        <div className="w-full h-full overflow-hidden">
          <img src={src} alt="hero" className="w-full h-full object-cover brightness-75" loading="lazy" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black" />
    </div>
  );
}
