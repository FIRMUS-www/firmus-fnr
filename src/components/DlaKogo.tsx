import { personas } from "../content/personas";

export default function DlaKogo() {


  return (
    <section id="dla-kogo" className="border-b-2 border-ink px-5 md:px-10 py-16 md:py-24">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest">§ 03 — dla kogo</div>
          <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mt-3">
            NIE DLA<br/>KAŻDEGO<span className="text-orange">.</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-ink/60 max-w-xs">
          Ryczałt nie jest uniwersalny. Sprawdź, czy do Ciebie pasuje —
          zanim złożysz oświadczenie. Termin zależy od miesiąca uzyskania pierwszego przychodu w roku.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {personas.map((p, i) => (
          <div key={i} className={`border-2 border-ink p-6 md:p-8 group hover:bg-ink hover:text-cream transition-colors ${i % 3 !== 2 ? "lg:border-r-2 lg:-ml-[2px]" : ""} ${i < personas.length - 3 ? "border-b-0 md:border-b-2 lg:border-b-2 -mt-[2px] lg:mt-0 md:-mt-[2px]" : ""}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="text-5xl">{p.emoji}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest border border-current px-2 py-1">
                {p.tag}
              </div>
            </div>
            <div className="font-display text-3xl md:text-4xl leading-tight">{p.t}</div>
            <div className="font-mono text-sm mt-3 opacity-80 leading-snug">{p.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
