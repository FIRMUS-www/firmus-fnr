import { useState } from "react";
import {
  calculateTaxComparison,
  type ContributionStage,
  type CalculatorResult,
} from "../utils/calculator";
import { calculatorContent as content } from "../content/calculatorContent";

const money = (value: number) =>
  new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(value);

function ResultCard({
  eyebrow,
  title,
  accent,
  tax,
  health,
  social,
  total,
  months,
}: {
  eyebrow: string;
  title: string;
  accent: "lime" | "orange";
  tax: number;
  health: number;
  social: number;
  total: number;
  months: number;
}) {
  return (
    <article className="border-2 border-cream/30 bg-paper text-ink flex flex-col h-full">
      <div className={`p-5 md:p-6 border-b-2 border-ink ${accent === "lime" ? "bg-lime" : "bg-orange"}`}>
        <div className="font-mono text-xs uppercase tracking-widest">{eyebrow}</div>
        <h3 className="font-display text-3xl md:text-4xl mt-1 uppercase">{title}</h3>
      </div>

      <div className="p-5 md:p-6">
        <div className="font-mono text-xs uppercase tracking-widest text-ink/60">{content.resultAverageLabel}</div>
        <div className="font-display text-4xl lg:text-5xl mt-2 leading-none">
          {money(total / months)} <span className="text-orange text-xl">{content.monthlySuffix}</span>
        </div>
        <div className="font-mono text-xs text-ink/60 mt-3">
          {content.annualEquivalentLabel} <strong className="text-ink">{money(total)} {content.inputCurrency}</strong>
        </div>
      </div>

      <div className="mt-auto border-t-2 border-ink">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-5 md:px-6 py-3 font-mono text-[10px] uppercase tracking-wider text-ink/50">
          <span>{content.columns.component}</span><span>{content.columns.monthly}</span><span>{content.columns.annual}</span>
        </div>
        {[
          [content.resultRows.tax, tax],
          [content.resultRows.health, health],
          [content.resultRows.social, social],
        ].map(([label, value]) => (
          <div key={label as string} className="grid grid-cols-[1fr_auto_auto] gap-x-3 items-baseline border-t border-ink/20 px-5 md:px-6 py-4">
            <span className="font-mono text-xs uppercase">{label}</span>
            <span className="font-display text-base text-right whitespace-nowrap">{money((value as number) / months)} {content.amountSuffix}</span>
            <span className="font-display text-base text-right whitespace-nowrap min-w-20">{money(value as number)} {content.amountSuffix}</span>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 items-baseline border-t-2 border-ink bg-ink text-cream px-5 md:px-6 py-4">
          <span className="font-mono text-xs uppercase text-lime">{content.resultRows.total}</span>
          <span className="font-display text-lg text-right whitespace-nowrap">{money(total / months)} {content.amountSuffix}</span>
          <span className="font-display text-lg text-right whitespace-nowrap min-w-20">{money(total)} {content.amountSuffix}</span>
        </div>
      </div>
    </article>
  );
}

export default function Kalkulator() {
  const [przychod, setPrzychod] = useState(content.defaults.monthlyRevenue);
  const [koszty, setKoszty] = useState(content.defaults.monthlyCosts);
  const [stawka, setStawka] = useState(content.defaults.flatRate);
  const [chorobowe, setChorobowe] = useState(content.defaults.sicknessInsurance);
  const [stage, setStage] = useState<ContributionStage>(content.defaults.contributionStage);

  const resultsByStage = Object.fromEntries(
    content.stages.map((item) => [
      item.id,
      calculateTaxComparison({
        monthlyRevenue: przychod,
        monthlyCosts: koszty,
        flatRate: stawka,
        sicknessInsurance: chorobowe,
        contributionStage: item.id,
      }),
    ]),
  ) as Record<ContributionStage, CalculatorResult>;

  const result = resultsByStage[stage];
  const selectedStage = content.stages.find((item) => item.id === stage) ?? content.stages[0];

  return (
    <section id="kalkulator" className="border-b-2 border-ink bg-ink text-cream">
      <div className="px-5 md:px-10 py-16 md:py-24">
        <div className="font-mono text-xs uppercase tracking-widest text-lime">{content.sectionEyebrow}</div>
        <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85] tracking-tighter mt-4">
          {content.titleBeforeAccent} <span className="text-orange">{content.titleAccent}</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-cream/80">{content.description}</p>

        <div className="mt-10">
          <div className="font-mono text-xs uppercase tracking-widest text-cream/60 mb-3">{content.stageSelectorEyebrow}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-cream" role="tablist" aria-label={content.stageSelectorEyebrow}>
            {content.stages.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={stage === item.id}
                aria-controls="calculator-stage-panel"
                onClick={() => setStage(item.id)}
                className={`text-left p-4 md:p-5 border-b-2 last:border-b-0 md:border-b-0 md:border-r-2 md:last:border-r-0 border-cream transition-colors ${
                  stage === item.id ? "bg-lime text-ink" : "hover:bg-cream hover:text-ink"
                }`}
              >
                <span className="block font-mono text-[10px] uppercase tracking-widest opacity-70">{item.shortLabel}</span>
                <span className="block font-display text-xl md:text-2xl mt-1">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="calculator-stage-panel" role="tabpanel" className="mt-5 border-l-4 border-orange pl-4 py-1">
          <div className="font-display text-2xl">{selectedStage.shortLabel} · {selectedStage.title}</div>
          <p className="font-mono text-xs text-cream/70 mt-1">{selectedStage.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
          <div className="border-2 border-cream/30 bg-cream text-ink p-5 md:p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-ink/60">{content.assumptionsEyebrow}</div>
            <h3 className="font-display text-3xl mt-2">{content.assumptionsTitle}</h3>

            <div className="mt-7 space-y-6">
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest">{content.revenueLabel}</span>
                <div className="mt-2 flex items-center border-2 border-ink bg-paper">
                  <input type="number" min={0} step={500} value={przychod} onChange={(event) => setPrzychod(Math.max(0, Number(event.target.value)))} className="w-full min-w-0 bg-transparent px-4 py-3 font-display text-2xl outline-none" />
                  <span className="pr-4 font-mono text-xs font-bold">{content.inputCurrency}</span>
                </div>
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest">{content.costsLabel}</span>
                <div className="mt-2 flex items-center border-2 border-ink bg-paper">
                  <input type="number" min={0} step={500} value={koszty} onChange={(event) => setKoszty(Math.max(0, Number(event.target.value)))} className="w-full min-w-0 bg-transparent px-4 py-3 font-display text-2xl outline-none" />
                  <span className="pr-4 font-mono text-xs font-bold">{content.inputCurrency}</span>
                </div>
                <span className="block mt-2 font-mono text-[10px] text-ink/50">{content.costsHint}</span>
              </label>

              <fieldset>
                <legend className="font-mono text-xs uppercase tracking-widest">{content.flatRateLabel}</legend>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[2, 3, 5.5, 8.5, 10, 12, 12.5, 14, 15, 17].map((rate) => (
                    <button type="button" key={rate} onClick={() => setStawka(rate)} aria-pressed={stawka === rate} className={`font-mono text-xs px-3 py-2 border-2 ${stawka === rate ? "bg-ink text-lime border-ink" : "border-ink/30 hover:border-ink"}`}>
                      {String(rate).replace(".", ",")}%
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="flex items-start gap-3 border-t-2 border-ink/20 pt-5 cursor-pointer">
                <input type="checkbox" checked={chorobowe} onChange={(event) => setChorobowe(event.target.checked)} className="mt-0.5 size-5 accent-ink" />
                <span>
                  <span className="block font-mono text-xs uppercase tracking-widest">{content.sicknessLabel}</span>
                  <span className="block mt-1 font-mono text-[10px] text-ink/50">
                    {stage === "start"
                      ? content.sicknessStartHint
                      : `${content.sicknessAmountPrefix} ${money(result.monthlySocialZus)} ${content.amountSuffix}.`}
                  </span>
                </span>
              </label>
            </div>
          </div>

          <ResultCard eyebrow={content.flatRateVariant.eyebrow} title={content.flatRateVariant.title} accent="lime" tax={result.annualFlatRateTax} health={result.annualFlatRateHealth} social={result.annualSocialZus} total={result.annualFlatRateTotal} months={result.MONTHS} />
          <ResultCard eyebrow={content.scaleVariant.eyebrow} title={content.scaleVariant.title} accent="orange" tax={result.annualScaleTax} health={result.annualScaleHealth} social={result.annualSocialZus} total={result.annualScaleTotal} months={result.MONTHS} />
        </div>

        <div className="mt-10 border-2 border-cream/30">
          <div className="p-5 md:p-6 border-b-2 border-cream/30">
            <div className="font-mono text-xs uppercase tracking-widest text-lime">{content.summary.eyebrow}</div>
            <h3 className="font-display text-3xl md:text-4xl mt-2">{content.summary.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {content.stages.map((item) => {
              const stageResult = resultsByStage[item.id];
              const flatMonthly = stageResult.annualFlatRateTotal / stageResult.MONTHS;
              const scaleMonthly = stageResult.annualScaleTotal / stageResult.MONTHS;
              const winner = Math.abs(flatMonthly - scaleMonthly) < 0.01
                ? content.summary.tie
                : flatMonthly < scaleMonthly
                  ? content.summary.flatRateWins
                  : content.summary.scaleWins;
              return (
                <article key={item.id} className="p-5 md:p-6 border-b-2 last:border-b-0 md:border-b-0 md:border-r-2 md:last:border-r-0 border-cream/30">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-lime">{item.shortLabel}</div>
                  <h4 className="font-display text-2xl mt-1">{item.title}</h4>
                  <dl className="mt-5 space-y-3 font-mono text-xs">
                    <div className="flex justify-between gap-4"><dt>{content.summary.flatRate}</dt><dd className="font-bold">{money(flatMonthly)} {content.amountSuffix}</dd></div>
                    <div className="flex justify-between gap-4"><dt>{content.summary.scale}</dt><dd className="font-bold">{money(scaleMonthly)} {content.amountSuffix}</dd></div>
                    <div className="flex justify-between gap-4 border-t border-cream/30 pt-3 text-lime"><dt>{content.summary.cheaper}</dt><dd className="font-bold">{winner}</dd></div>
                  </dl>
                </article>
              );
            })}
          </div>
        </div>

        <p className="mt-6 border-l-4 border-lime pl-4 font-mono text-xs leading-relaxed text-cream/75">{content.smallZusPlusNote}</p>
        <div className="mt-6 border-t border-cream/20 pt-5 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px] leading-relaxed text-cream/60">
          {content.notes.map((note) => <p key={note}>{note}</p>)}
        </div>
      </div>
    </section>
  );
}
