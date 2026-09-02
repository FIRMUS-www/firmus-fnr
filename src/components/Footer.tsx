export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      {/* Giant wordmark */}
      <div className="border-b border-cream/20 overflow-hidden">
        <div className="font-display text-[22vw] leading-[0.8] tracking-tighter text-cream/5 px-5 py-4 whitespace-nowrap">
          FIRMA<span className="text-orange/30">NA</span>RYCZAŁCIE
        </div>
      </div>

      <div className="px-5 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">© 2026</div>
          <div className="font-sans text-cream/80 leading-snug">
            FirmaNaRyczalcie.pl<br/>
            NIP 000-000-00-00<br/>
            Wpis do CEIDG
          </div>
        </div>
        <div>
          <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">DZIAŁY</div>
          <ul className="space-y-1">
            <li><a href="#stawki" className="hover:text-lime">Stawki</a></li>
            <li><a href="#kalkulator" className="hover:text-lime">Kalkulator</a></li>
            <li><a href="#dla-kogo" className="hover:text-lime">Dla kogo</a></li>
            <li><a href="#faq" className="hover:text-lime">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">SOCIAL</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-lime">LinkedIn ↗</a></li>
            <li><a href="#" className="hover:text-lime">Bluesky ↗</a></li>
            <li><a href="#" className="hover:text-lime">YouTube ↗</a></li>
            <li><a href="#" className="hover:text-lime">RSS ↗</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">PRAWNE</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-lime">Regulamin</a></li>
            <li><a href="#" className="hover:text-lime">Polityka prywatności</a></li>
            <li><a href="#" className="hover:text-lime">RODO</a></li>
            <li><a href="#" className="hover:text-lime">Cookies</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/20 px-5 md:px-10 py-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-cream/60">
        <div>Treści mają charakter informacyjny — nie stanowią porady podatkowej.</div>
        <div>Wydanie 07 · lato 2026 · Warszawa</div>
      </div>
    </footer>
  );
}
