/*
React single-file portfolio app for a classic-car photographer/garage (dark theme).

How to use:
1) Install dependencies in a new React app (Vite or Create React App):
   npm init vite@latest my-portfolio --template react
   cd my-portfolio
   npm install
   npm install framer-motion
   # Install Tailwind (follow Tailwind docs). Example:
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   // add Tailwind directives to ./src/index.css

2) Put this file as src/App.jsx and import ./index.css that has Tailwind base/components/utilities.
3) Replace images[] entries with direct image URLs hosted where you control them.
   - You can use direct image links exported from Facebook (right-click -> copy image address) or
     download and upload to a CDN (Cloudinary, ImgBB, Imgur, your hosting) for stability.
   - Google Image search links often redirect; it's best to host the images yourself.

Notes on images from Facebook/Google (copyright): ensure you have the rights to publish them.

Features included:
- Dark, modern layout for classic car photography
- Parallax hero, scroll-reveal animations (Framer Motion + IntersectionObserver), gallery grid
- Lightbox modal with pinch/drag support fallback (basic)
- Smooth scroll, responsive nav, contact form (mailto), social links
- Easy to customize colors, spacing, fonts via Tailwind classes

Replace the sample data in the `images` array with your actual image URLs.
*/

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  
  const [images] = useState([
    "caroseryjni_portfolio_fotografia_motoryzacyjna1.jpg",
    "caroseryjni_portfolio_fotografia_motoryzacyjna2.jpg",
    "caroseryjni_portfolio_fotografia_motoryzacyjna3.jpg",
    "caroseryjni_portfolio_fotografia_motoryzacyjna4.jpg",
    "caroseryjni_portfolio_fotografia_motoryzacyjna5.jpg",
    "caroseryjni_portfolio_fotografia_motoryzacyjna6.jpg",
  ]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Smooth lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "auto";
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center ring-1 ring-white/5"> 
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 8l4-4 4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <a href="#hero" className="text-lg font-semibold tracking-tight">Caroseryjni</a>
              <div className="text-xs text-neutral-400">Classic Car Photography</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-neutral-300">
            <a href="#portfolio" className="hover:text-white transition">Portfolio</a>
            <a href="#about" className="hover:text-white transition">O mnie</a>
            <a href="#contact" className="hover:text-white transition">Kontakt</a>
            <a href="#" className="px-4 py-2 rounded-md border border-neutral-700 hover:bg-white/5 transition">Book</a>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(v => !v)} aria-label="menu" className="p-2 rounded-md ring-1 ring-white/5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16M4 12h16M4 17h16" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-white/5">
              <div className="px-5 py-4 flex flex-col gap-3 text-neutral-300">
                <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a>
                <a href="#about" onClick={() => setMenuOpen(false)}>O mnie</a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>Kontakt</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO with parallax */}
        <section id="hero" className="relative overflow-hidden">
          <ParallaxHero image={images[0]} />
          <div className="max-w-6xl mx-auto px-5 py-24 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Caroseryjni — Classic Cars</h1>
                <p className="text-neutral-300 max-w-xl">Klasyczne samochody w klimacie dokumentalnym i studyjnym. Sesje, restauracje, eventy. Fotografia, która oddaje duszę metalowych piękności.</p>
                <div className="flex gap-3">
                  <a href="#portfolio" className="px-6 py-3 rounded-md bg-white/6 border border-white/6 backdrop-blur-sm hover:bg-white/8 transition">Zobacz portfolio</a>
                  <a href="#contact" className="px-6 py-3 rounded-md border border-neutral-700 hover:bg-white/5 transition">Kontakt</a>
                </div>
              </motion.div>

              <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-right md:text-left">
                <div className="inline-block text-neutral-400">Rok założenia: <strong className="text-white">2012</strong></div>
                <div className="mt-4 text-sm text-neutral-300">Specjalizacja: Fotografia samochodowa klasyków, restauracje, sesje detailingu, reportaże z eventów.</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Portfolio gallery */}
        <section id="portfolio" className="max-w-6xl mx-auto px-5 py-20">
          <SectionTitle title="Portfolio" subtitle="Klasyczne samochody. Wybrane sesje." />

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <GalleryCard key={i} src={src} i={i} onOpen={() => setLightboxIndex(i)} />
            ))}
          </div>

        </section>

        {/* About */}
        <section id="about" className="max-w-6xl mx-auto px-5 py-20 border-t border-white/5">
          <div className="md:flex gap-8 items-center">
            <div className="md:w-1/2">
              <SectionTitle title="O mnie" subtitle="Fotografia klasycznych samochodów" />
              <p className="mt-4 text-neutral-300">Jestem fotografem z pasją do klasyki. Dokumentuję restauracje, detale, oraz oddaję charakter pojazdów przy pomocy światła i kompozycji. Pracuję na lokalizacjach i w studio; oferuję pełne sesje oraz reportaże z eventów.</p>
              <ul className="mt-4 text-neutral-400 list-disc pl-5">
                <li>Sesje studyjne i plenerowe</li>
                <li>Retusz i przygotowanie do druku</li>
                <li>Współpraca z warsztatami i restauratorami</li>
              </ul>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/5">
                <img src={images[1]} alt="about" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-6xl mx-auto px-5 py-20">
          <SectionTitle title="Kontakt" subtitle="Zamów sesję lub zapytaj o szczegóły" />

          <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-neutral-300">Chętnie przygotuję ofertę dopasowaną do Twojego klasyka. Poniżej znajdziesz szybki formularz (mailto) lub informacje kontaktowe.</p>

              <div className="mt-6 space-y-3 text-neutral-300">
                <div>📞 +48 600 000 000</div>
                <div>✉️ <a href="mailto:kontakt@caroseryjni.pl" className="underline">kontakt@caroseryjni.pl</a></div>
                <div>📍 Warszawa / dojazd na sesję</div>

                <div className="flex gap-3 mt-4">
                  <a href="#" className="px-3 py-2 rounded-md border border-white/6 text-sm">Facebook</a>
                  <a href="#" className="px-3 py-2 rounded-md border border-white/6 text-sm">Instagram</a>
                </div>
              </div>
            </div>

            <form className="bg-white/3 p-6 rounded-xl ring-1 ring-white/5">
              <label className="block text-sm text-neutral-200">Imię i nazwisko</label>
              <input className="w-full mt-2 p-3 rounded-md bg-transparent border border-white/6" placeholder="Jan Kowalski" />

              <label className="block text-sm text-neutral-200 mt-4">E-mail</label>
              <input className="w-full mt-2 p-3 rounded-md bg-transparent border border-white/6" placeholder="twoj@email.pl" />

              <label className="block text-sm text-neutral-200 mt-4">Wiadomość</label>
              <textarea className="w-full mt-2 p-3 rounded-md bg-transparent border border-white/6" rows={5} placeholder="Krótki opis projektu" />

              <div className="mt-4 flex gap-3">
                <button type="button" className="px-5 py-2 rounded-md bg-white/6">Wyślij</button>
                <button type="button" className="px-5 py-2 rounded-md border border-white/6">Zadzwoń</button>
              </div>
            </form>
          </div>
        </section>

        <footer className="border-t border-white/5 py-8 mt-12">
          <div className="max-w-6xl mx-auto px-5 text-neutral-400 text-sm">© {new Date().getFullYear()} Caroseryjni — All rights reserved.</div>
        </footer>
      </main>

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onPrev={() => setLightboxIndex(i => (i - 1 + images.length) % images.length)} onNext={() => setLightboxIndex(i => (i + 1) % images.length)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ParallaxHero({ image }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = Math.min(Math.max(-rect.top / 3, -100), 100);
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <div ref={ref} className="w-full h-[60vh] md:h-[80vh] transform transition-transform duration-300">
        <div className="w-full h-full overflow-hidden">
          <img src={image} alt="hero" className="w-full h-full object-cover brightness-75" loading="lazy" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black" />
    </div>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <div className="text-neutral-400 mt-1">{subtitle}</div>
    </div>
  );
}

function useReveal(delay = 0) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

function GalleryCard({ src, i, onOpen }) {
  const [ref, visible] = useReveal(i * 60);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-lg overflow-hidden">
      <button onClick={onOpen} className="group block w-full h-full focus:outline-none">
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img src={src} alt={`photo-${i}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
      </button>
    </motion.div>
  );
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const [current, setCurrent] = useState(index);
  useEffect(() => setCurrent(index), [index]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="max-w-[1200px] w-full">
        <div className="relative">
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-md ring-1 ring-white/10">✕</button>
          <button onClick={() => { onPrev(); setCurrent(c => (c - 1 + images.length) % images.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-md ring-1 ring-white/10">◀</button>
          <button onClick={() => { onNext(); setCurrent(c => (c + 1) % images.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md ring-1 ring-white/10">▶</button>

          <div className="w-full aspect-[16/9] overflow-hidden rounded-md">
            <img src={images[current]} alt={`full-${current}`} className="w-full h-full object-contain" />
          </div>

          <div className="mt-3 flex items-center justify-between text-neutral-300">
            <div>Zdjęcie {current + 1} / {images.length}</div>
            <div className="text-sm text-neutral-400">Kliknij poza obraz, aby zamknąć</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
