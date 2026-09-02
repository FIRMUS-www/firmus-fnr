export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-cream">
      <a href="#main" className="skip-link">Przejdź do treści</a>
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 lg:px-10 py-4">
        <a href="#" className="flex items-baseline gap-2 group shrink-0">
          <span className="font-display text-base sm:text-xl lg:text-2xl tracking-tight">FIRMA<span className="text-orange">NA</span>RYCZAŁCIE</span>
          <span className="hidden xl:inline font-mono text-xs text-ink/60">#2026</span>
        </a>
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-xs lg:text-sm font-medium">
          <a href="#stawki" className="hover:text-orange whitespace-nowrap">Dobierz stawkę</a>
          <a href="#kalkulator" className="hover:text-orange whitespace-nowrap">Sprawdź opłacalność</a>
        </nav>
        <a href="#kontakt" className="btn-invert bg-ink text-lime px-2 sm:px-3 lg:px-4 py-2 font-mono text-[9px] sm:text-[10px] lg:text-xs font-bold tracking-wide lg:tracking-widest uppercase whitespace-nowrap">
          Zarejestruj firmę za 0 zł
        </a>
      </div>
    </header>
  );
}
