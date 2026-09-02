export default function Kontakt() {
  return (
    <section id="kontakt" className="border-b-2 border-ink bg-ink text-cream">
      <div className="px-5 md:px-10 py-16 md:py-24">
        <div className="font-mono text-xs uppercase tracking-widest text-lime mb-3">§ 06 — kontakt</div>
        <h2 className="font-display text-[13vw] md:text-[11vw] leading-[0.85] tracking-tighter">
          POGADAJMY<br/>
          O <span className="text-lime">TWOIM</span><br/>
          RYCZAŁCIE<span className="text-orange">.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-cream p-6">
            <div className="font-mono text-xs text-lime mb-2">MAIL</div>
            <a href="mailto:czesc@firmanaryczalcie.pl" className="font-display text-xl md:text-2xl hover:text-lime transition-colors break-all">
              czesc@firmanaryczalcie.pl
            </a>
          </div>
          <div className="border-2 border-cream p-6">
            <div className="font-mono text-xs text-lime mb-2">TELEFON</div>
            <a href="tel:+48500000000" className="font-display text-xl md:text-2xl hover:text-lime transition-colors">
              +48 500 000 000
            </a>
          </div>
          <div className="border-2 border-cream p-6">
            <div className="font-mono text-xs text-lime mb-2">BIURO</div>
            <div className="font-display text-xl md:text-2xl">
              ul. Podatkowa 12/4<br/>00-001 Warszawa
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#" className="btn-invert bg-lime text-ink border-2 border-lime px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
            Umów konsultację 45 min
          </a>
          <a href="#" className="btn-invert bg-transparent text-cream border-2 border-cream px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
            Newsletter (1x w miesiącu)
          </a>
        </div>
      </div>
    </section>
  );
}
