import { facts } from "../content/facts";

export default function Fakty() {


  return (
    <section className="border-b-2 border-ink px-5 md:px-10 py-16 md:py-20 bg-cream-dark">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {facts.map((f, i) => (
          <div key={i} className={`border-2 border-ink p-5 md:p-7 ${i < facts.length - 1 ? "md:border-r-2 md:-mr-[2px]" : ""} ${i % 2 === 0 ? "bg-cream-dark" : "bg-cream"}`}>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink/60 mb-2">FAKT #{String(i+1).padStart(2, "0")}</div>
            <div className="font-display text-3xl md:text-5xl leading-none tracking-tight">{f.k}</div>
            <div className="font-mono text-xs mt-3 text-ink/80 leading-snug">{f.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
