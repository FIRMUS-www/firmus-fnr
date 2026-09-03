import { steps, processSectionContent as content } from "../content/processSteps";

export default function Proces() {
  return (
    <section id="ksiegowosc" className="border-b-2 border-ink bg-paper px-5 md:px-10 py-16 md:py-24">
      <div className="font-mono text-xs uppercase tracking-widest mb-3">{content.eyebrow}</div>
      <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mb-12">
        {content.titleLine1}<br/>{content.titleLine2}<span className="text-lime">.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        {steps.map((step, index) => (
          <div key={step.n} className={`border-2 border-ink p-5 md:p-6 ${index < steps.length - 1 ? "md:border-r-2 md:-mr-[2px]" : ""} ${index % 2 === 0 ? "bg-cream" : "bg-lime"}`}>
            <div className="font-display text-7xl md:text-8xl leading-none">{step.n}</div>
            <div className="font-display text-2xl mt-4 uppercase tracking-tight">{step.t}</div>
            <div className="font-mono text-xs mt-3 text-ink/80 leading-snug">{step.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
