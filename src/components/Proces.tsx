import { steps } from "../content/processSteps";

export default function Proces() {


  return (
    <section id="proces" className="border-b-2 border-ink bg-paper px-5 md:px-10 py-16 md:py-24">
      <div className="font-mono text-xs uppercase tracking-widest mb-3">§ 04 — proces</div>
      <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mb-12">
        OD ZERA<br/>DO PIT-28<span className="text-lime">.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        {steps.map((s, i) => (
          <div key={s.n} className={`border-2 border-ink p-5 md:p-6 ${i < steps.length - 1 ? "md:border-r-2 md:-mr-[2px]" : ""} ${i % 2 === 0 ? "bg-cream" : "bg-lime"}`}>
            <div className="font-display text-7xl md:text-8xl leading-none">{s.n}</div>
            <div className="font-display text-2xl mt-4 uppercase tracking-tight">{s.t}</div>
            <div className="font-mono text-xs mt-3 text-ink/80 leading-snug">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
