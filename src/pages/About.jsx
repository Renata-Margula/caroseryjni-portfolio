import SectionTitle from "../components/SectionTitle.jsx";
import AccordionItem from "../components/AccordionItem.jsx";

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-5 py-20 border-t border-white/5">
      <div className="md:flex gap-8 items-center">
        <div className="md:w-1/2">
          <SectionTitle title="O nas" subtitle="Fotografia klasycznych samochodów" />
          <p className="mt-4 text-neutral-300">
            Jesteśmy dwójką pasjonatów, których drogi życiowe skrzyżowały się w świecie fotografii i motoryzacji.
          </p>

          <div className="mt-4 space-y-2">
            <AccordionItem
              title="Zdjęcia z drona i krótkie formy video na social media"
              content="Fotografujemy samochody w plenerze, zarówno statycznie jak i w ruchu."
              media={{ type: "video", src: "/videos/sesja_plener.mp4" }}
            />
            <AccordionItem
              title="Sesje plenerowe (statyczne i w ruchu)"
              content="Tworzymy ujęcia z drona i krótkie filmy idealne do social media."
              media={{ type: "image", src: "/images/drone_shot.jpg" }}
            />
            <AccordionItem
              title="Zdjęcia wnętrz, indywidualne, biznesowe"
              content="Profesjonalne sesje wnętrz i zdjęcia biznesowe."
            />
            <AccordionItem
              title="I inne - napisz do nas"
              content="Masz indywidualny pomysł? Skontaktuj się z nami."
            />
          </div>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/5">
            <img
              src="/images/caroseryjni_portfolio_fotografia_motoryzacyjna11.webp"
              alt="about"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
