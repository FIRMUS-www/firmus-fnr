export default function Hero() {
  return (
    <section className="relative border-b-2 border-ink overflow-hidden">
      {/* Running top bar */}
      <div className="bg-ink text-cream font-mono text-xs overflow-hidden border-b-2 border-ink">
        <div className="flex whitespace-nowrap animate-marquee-slow py-2">
          {Array(4).fill(0).map((_, i) => (
            <span key={i} className="flex items-center gap-10 px-6">
              <span>● NAZWISK NIE POKAZUJEMY</span>
              <span className="text-lime">/</span>
              <span>STAWKI OD 2% DO 17% · SPRAWDŹ PKWiU</span>
              <span className="text-lime">/</span>
              <span>LIMIT 2 MLN EUR</span>
              <span className="text-lime">/</span>
              <span>BEZ KSIĘGI HANDLOWEJ</span>
              <span className="text-lime">/</span>
              <span>EDG#CEIDG#VAT</span>
              <span className="text-lime">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 md:px-10 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-8">
          <span className="w-2 h-2 bg-orange animate-blink"></span>
          <span className="font-mono text-xs uppercase tracking-widest">Wydanie 07 / Lato 2026</span>
          <span className="font-mono text-xs text-ink/50">· aktualizacja 2 września 2026</span>
        </div>

        <h1 className="font-display text-[17vw] md:text-[13vw] leading-[0.85] tracking-tighter">
          RYCZAŁT<span
            className="inline-block text-orange ml-[0.09em] origin-bottom-left"
            style={{ fontSize: "1.2em", transform: "rotate(10deg)" }}
          >?</span>
        </h1>

        <p className="mt-8 text-lg md:text-2xl leading-snug max-w-3xl">
          <em className="font-semibold not-italic bg-lime px-1">Porównaj opcje</em> i przekonaj się,
          czy na ryczałcie <em className="font-semibold not-italic bg-lime px-1">rzeczywiście zapłacisz mniej.</em>
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#kalkulator" className="btn-invert bg-lime border-2 border-ink px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
            ▸ Kalkulator opłacalności
          </a>
          <a href="#dla-kogo" className="btn-invert bg-cream border-2 border-ink px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
            Przykłady firm
          </a>
        </div>
      </div>

      {/* Current facts, news and interpretation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-ink">
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-ink bg-paper p-6 md:p-8">
          <div className="font-mono text-xs text-ink/60 uppercase tracking-widest" style={{ marginBottom: 50 }}>Ryczałt w 2026</div>
          <dl className="divide-y divide-ink/20">
            <div className="pb-5">
              <dt className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-2">Górny limit</dt>
              <dd className="font-display text-2xl">2 mln EUR</dd>
            </div>
            <div className="py-5">
              <dt className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-2">Stawki</dt>
              <dd className="font-display text-2xl">od 2% do 17%</dd>
            </div>
            <div className="pt-5">
              <dt className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-2">Składka zdrowotna</dt>
              <dd className="font-display text-lg lg:text-xl leading-tight">498,35 / 830,58 / 1 495,04 zł</dd>
            </div>
          </dl>
        </div>

        <a href="#zmiany-2027" className="block border-b-2 md:border-b-0 md:border-r-2 border-ink bg-orange text-ink p-5 md:p-7 group">
          <div className="font-mono text-xs uppercase tracking-widest" style={{ marginBottom: 50 }}>⚠ Uwaga</div>
          <div className="font-display text-2xl md:text-3xl leading-tight">
            RZĄD PLANUJE ZMIANY W RYCZAŁCIE OD 2027 R.
          </div>
          <div className="font-mono text-xs mt-4 font-bold group-hover:translate-x-1 transition-transform">CZYTAJ WIĘCEJ →</div>
        </a>

        <a href="https://eureka.mf.gov.pl/informacje/podglad/692138" target="_blank" rel="noreferrer" className="block bg-ink text-cream p-5 md:p-7 group">
          <div className="font-mono text-xs text-lime uppercase tracking-widest" style={{ marginBottom: 50 }}>#Fakt</div>
          <div className="font-mono text-[10px] text-cream/60 uppercase tracking-widest mb-3">Interpretacja KIS · 18.05.2026</div>
          <div className="font-sans text-base md:text-lg leading-relaxed max-w-md">
            KIS potwierdził <span className="bg-lime text-ink px-1 font-bold">8,5% ryczałtu</span> dla wybranych usług technicznych i postprodukcyjnych.
          </div>
          <div className="font-mono text-xs text-lime mt-4 font-bold group-hover:translate-x-1 transition-transform">ZOBACZ INTERPRETACJĘ ↗</div>
        </a>
      </div>
    </section>
  );
}
