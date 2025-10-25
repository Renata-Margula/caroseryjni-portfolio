// src/pages/Contact.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Contact() {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 py-20">
      <SectionTitle title="Kontakt" subtitle="Zamów sesję lub zapytaj o szczegóły" />

      <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
        {/* Lewa kolumna - dane kontaktowe */}
        <div>
          <p className="text-neutral-300">
            Chętnie przygotujemy ofertę dopasowaną do Twojego klasyka. Poniżej znajdziesz szybki formularz lub informacje kontaktowe.
          </p>

          <div className="mt-6 space-y-3 text-neutral-300">
            <div>✉️ <a href="mailto:kontakt@caroseryjni.pl" className="underline">kontakt@caroseryjni.pl</a></div>
            <div>📍 Wrocław / Cała Polska / Dojazd na sesję</div>

            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md border border-white/6 text-sm hover:bg-white/5 transition">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md border border-white/6 text-sm hover:bg-white/5 transition">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Prawa kolumna - formularz */}
        <div>
          <form className="bg-white/3 p-6 rounded-xl ring-1 ring-white/5 flex flex-col gap-4">
            <label className="block text-sm text-neutral-200">Imię i nazwisko</label>
            <input
              name="name"
              className="w-full p-3 rounded-md bg-transparent border border-white/6"
              placeholder="Jan Kowalski"
            />

            <label className="block text-sm text-neutral-200">E-mail</label>
            <input
              name="email"
              type="email"
              className="w-full p-3 rounded-md bg-transparent border border-white/6"
              placeholder="twoj@email.pl"
            />

            <label className="block text-sm text-neutral-200">Wiadomość</label>
            <textarea
              name="message"
              className="w-full p-3 rounded-md bg-transparent border border-white/6"
              rows={5}
              placeholder="Krótki opis projektu"
            />

            {/* Przyciski Wyślij i Zadzwoń w jednej linii */}
            <div className="flex gap-3 mt-2">
              <button type="submit" className="px-5 py-2 rounded-md bg-white/6 hover:bg-white/8 transition">
                Wyślij
              </button>

              {!showPhone ? (
                <button
                  type="button"
                  onClick={() => setShowPhone(true)}
                  className="px-5 py-2 rounded-md border border-white/6 text-sm hover:bg-white/5 transition"
                >
                  Zadzwoń
                </button>
              ) : (
                <AnimatePresence>
                  <motion.a
                    href="tel:+48503363989"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="px-5 py-2 rounded-md border border-white/6 text-sm text-center block hover:bg-white/5 transition"
                  >
                    📞 +48 503 363 989
                  </motion.a>
                </AnimatePresence>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
