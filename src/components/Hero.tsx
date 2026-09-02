import { heroContent as content } from "../content/hero";

export default function Hero() {
  return (
    <section className="relative border-b-2 border-ink overflow-hidden">
      <div className="bg-ink text-cream font-mono text-xs overflow-hidden border-b-2 border-ink">
        <div className="flex whitespace-nowrap animate-marquee-slow py-2">
          {Array(4).fill(0).map((_, iteration) => (
            <span key={iteration} className="flex items-center gap-10 px-6">
              {content.ticker.map((item) => (
                <span key={item} className="contents">
                  <span>{item}</span>
                  <span className="text-lime">/</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 md:px-10 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-8">
          <span className="w-2 h-2 bg-orange animate-blink"></span>
          <span className="font-mono text-xs uppercase tracking-widest">{content.edition}</span>
          <span className="font-mono text-xs text-ink/50">{content.updatedAt}</span>
        </div>

        <h1 className="font-display text-[17vw] md:text-[13vw] leading-[0.85] tracking-tighter">
          {content.title}<span
            className="inline-block text-orange ml-[0.09em] origin-bottom-left"
            style={{ fontSize: "1.2em", transform: "rotate(10deg)" }}
          >?</span>
        </h1>

        <p className="mt-8 text-lg md:text-2xl leading-snug max-w-3xl">
          <em className="font-semibold not-italic bg-lime px-1">{content.leadHighlight}</em>{" "}
          {content.leadMiddle}{" "}
          <em className="font-semibold not-italic bg-lime px-1">{content.leadEndHighlight}</em>
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={content.primaryCta.href} className="btn-invert bg-lime border-2 border-ink px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
            ▸ {content.primaryCta.label}
          </a>
          <a href={content.secondaryCta.href} className="btn-invert bg-cream border-2 border-ink px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
            {content.secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-ink">
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-ink bg-paper p-6 md:p-8">
          <div className="font-mono text-xs text-ink/60 uppercase tracking-widest" style={{ marginBottom: 50 }}>{content.summary.title}</div>
          <dl className="divide-y divide-ink/20">
            {content.summary.items.map((item, index) => (
              <div key={item.label} className={index === 0 ? "pb-5" : index === content.summary.items.length - 1 ? "pt-5" : "py-5"}>
                <dt className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-2">{item.label}</dt>
                <dd className={index === content.summary.items.length - 1 ? "font-display text-lg lg:text-xl leading-tight" : "font-display text-2xl"}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <a href={content.alert.href} className="block border-b-2 md:border-b-0 md:border-r-2 border-ink bg-orange text-ink p-5 md:p-7 group">
          <div className="font-mono text-xs uppercase tracking-widest" style={{ marginBottom: 50 }}>{content.alert.eyebrow}</div>
          <div className="font-display text-2xl md:text-3xl leading-tight">{content.alert.title}</div>
          <div className="font-mono text-xs mt-4 font-bold group-hover:translate-x-1 transition-transform">{content.alert.cta}</div>
        </a>

        <a href={content.fact.href} target="_blank" rel="noreferrer" className="block bg-ink text-cream p-5 md:p-7 group">
          <div className="font-mono text-xs text-lime uppercase tracking-widest" style={{ marginBottom: 50 }}>{content.fact.eyebrow}</div>
          <div className="font-mono text-[10px] text-cream/60 uppercase tracking-widest mb-3">{content.fact.meta}</div>
          <div className="font-sans text-base md:text-lg leading-relaxed max-w-md">
            {content.fact.beforeHighlight}{" "}<span className="bg-lime text-ink px-1 font-bold">{content.fact.highlight}</span>{" "}{content.fact.afterHighlight}
          </div>
          <div className="font-mono text-xs text-lime mt-4 font-bold group-hover:translate-x-1 transition-transform">{content.fact.cta}</div>
        </a>
      </div>
    </section>
  );
}
