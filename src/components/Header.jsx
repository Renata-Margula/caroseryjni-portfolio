import { motion, AnimatePresence } from "framer-motion";

export default function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <motion.div
            layoutId="logo"
            className="w-10 h-10 rounded-md bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center ring-1 ring-white/5"
          >
            <img src="/images/caroseryjni_logo_bl_wh.png" alt="Logo" className="w-[70%] h-[70%] object-contain" />
          </motion.div>
          <div>
            <a href="/" className="text-lg font-semibold tracking-tight">Caroseryjni</a>
            <div className="text-xs text-neutral-400">Renata & Jakub</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-neutral-300">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/portfolio" className="hover:text-white transition">Portfolio</a>
          <a href="/about" className="hover:text-white transition">O nas</a>
          <a href="/contact" className="hover:text-white transition">Kontakt</a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="menu"
            aria-expanded={menuOpen}
            className="p-2 rounded-md ring-1 ring-white/5"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5"
          >
            <div className="px-5 py-4 flex flex-col gap-3 text-neutral-300">
              <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a>
              <a href="/about" onClick={() => setMenuOpen(false)}>O nas</a>
              <a href="/contact" onClick={() => setMenuOpen(false)}>Kontakt</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
