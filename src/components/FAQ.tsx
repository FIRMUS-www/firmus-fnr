import { useState } from "react";
import { items } from "../content/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);


  return (
    <section id="faq" className="border-b-2 border-ink px-5 md:px-10 py-16 md:py-24">
      <div className="font-mono text-xs uppercase tracking-widest mb-3">§ 05 — pytania</div>
      <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mb-10">
        PYTANIA,<br/>KTÓRE<br/>ZADAJESZ<span className="text-orange">.</span>
      </h2>

      <div className="border-t-2 border-ink">
        {items.map((it, i) => (
          <div key={i} className="border-b-2 border-ink">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
              className="w-full flex items-start justify-between gap-6 py-5 md:py-7 text-left group"
            >
              <div className="flex items-start gap-4 md:gap-6">
                <span className="font-mono text-xs text-ink/50 pt-1">0{i + 1}</span>
                <span className="font-display text-xl md:text-3xl leading-tight tracking-tight">{it.q}</span>
              </div>
              <span className={`font-display text-4xl md:text-5xl transition-transform ${open === i ? "rotate-45 text-orange" : ""}`}>+</span>
            </button>
            {open === i && (
              <div id={`faq-answer-${i}`} className="pb-6 pl-0 md:pl-14 pr-12 font-mono text-sm text-ink/80 leading-relaxed max-w-3xl">
                {it.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
