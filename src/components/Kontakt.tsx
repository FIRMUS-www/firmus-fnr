import { contactContent as content } from "../content/contact";

export default function Kontakt() {
  return (
    <section id="kontakt" className="border-b-2 border-ink bg-ink text-cream">
      <div className="px-5 md:px-10 py-16 md:py-24">
        <div className="font-mono text-xs uppercase tracking-widest text-lime mb-3">{content.sectionEyebrow}</div>
        <h2 className="font-display text-[13vw] md:text-[11vw] leading-[0.85] tracking-tighter">
          {content.titleLines.first}<br/>
          {content.titleLines.secondBeforeAccent} <span className="text-lime">{content.titleLines.secondAccent}</span><br/>
          {content.titleLines.third}<span className="text-orange">.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-cream p-6">
            <div className="font-mono text-xs text-lime mb-2">{content.email.label}</div>
            <a href={`mailto:${content.email.value}`} className="font-display text-xl md:text-2xl hover:text-lime transition-colors break-all">{content.email.value}</a>
          </div>
          <div className="border-2 border-cream p-6">
            <div className="font-mono text-xs text-lime mb-2">{content.phone.label}</div>
            <a href={`tel:${content.phone.href}`} className="font-display text-xl md:text-2xl hover:text-lime transition-colors">{content.phone.value}</a>
          </div>
          <div className="border-2 border-cream p-6">
            <div className="font-mono text-xs text-lime mb-2">{content.office.label}</div>
            <div className="font-display text-xl md:text-2xl">{content.office.line1}<br/>{content.office.line2}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
