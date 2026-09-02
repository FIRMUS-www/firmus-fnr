import { footerContent as content } from "../content/footer";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="border-b border-cream/20 overflow-hidden">
        <div className="font-display text-[22vw] leading-[0.8] tracking-tighter text-cream/5 px-5 py-4 whitespace-nowrap">
          {content.brandBeforeAccent}<span className="text-orange/30">{content.brandAccent}</span>{content.brandAfterAccent}
        </div>
      </div>

      <div className="px-5 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">{content.copyright}</div>
          <div className="font-sans text-cream/80 leading-snug">
            {content.companyLines.map((line) => <span key={line}>{line}<br/></span>)}
          </div>
        </div>
        {content.sections.map((section) => (
          <div key={section.title}>
            <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">{section.title}</div>
            <ul className="space-y-1">
              {section.links.map((link) => <li key={link.label}><a href={link.href} className="hover:text-lime">{link.label}</a></li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-cream/20 px-5 md:px-10 py-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-cream/60">
        <div>{content.disclaimer}</div>
        <div>{content.edition}</div>
      </div>
    </footer>
  );
}
