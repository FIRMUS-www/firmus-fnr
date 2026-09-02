import { newsContent as content } from "../content/news";

export default function Zmiany2027() {
  return (
    <section id="zmiany-2027" className="border-b-2 border-ink bg-cream px-5 md:px-10 py-16 md:py-20 scroll-mt-24">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="font-mono text-xs uppercase tracking-widest">{content.eyebrow}</div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl leading-[0.95] max-w-5xl">{content.title}</h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-3xl">{content.description}</p>
          <a href={content.sourceUrl} target="_blank" rel="noreferrer" className="inline-block mt-8 border-2 border-ink bg-cream px-5 py-3 font-mono text-xs font-bold tracking-widest uppercase hover:bg-ink hover:text-lime transition-colors">
            {content.sourceLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
