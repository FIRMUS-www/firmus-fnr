import { navigationContent as content } from "../content/navigation";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-cream">
      <a href="#main" className="skip-link">{content.skipLink}</a>
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 lg:px-10 py-4">
        <a href="#" className="flex items-baseline gap-2 group shrink-0">
          <span className="font-display text-base sm:text-xl lg:text-2xl tracking-tight">
            {content.brandBeforeAccent}<span className="text-orange">{content.brandAccent}</span>{content.brandAfterAccent}
          </span>
          <span className="hidden xl:inline font-mono text-xs text-ink/60">{content.edition}</span>
        </a>
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-xs lg:text-sm font-medium">
          {content.links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-orange whitespace-nowrap">{link.label}</a>
          ))}
        </nav>
        <a href={content.cta.href} className="btn-invert bg-ink text-lime px-2 sm:px-3 lg:px-4 py-2 font-mono text-[9px] sm:text-[10px] lg:text-xs font-bold tracking-wide lg:tracking-widest uppercase whitespace-nowrap">
          {content.cta.label}
        </a>
      </div>
    </header>
  );
}
