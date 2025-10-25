import ParallaxHero from "../components/ParallaxHero.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Home() {
  const heroImage = { src: "/images/caroseryjni_portfolio_fotografia_motoryzacyjna1.jpg" };

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100 font-sans">
      <section className="max-w-6xl mx-auto px-5 py-24 relative z-10">
        <SectionTitle title="Caroseryjni" subtitle="Fotografia motoryzacyjna" />
        <p className="mt-4 text-neutral-300">Klasyczne samochody w klimacie dokumentalnym i studyjnym.</p>
      </section>
    </main>
  );
}
