import { useState } from "react";
import { calculateTaxComparison } from "../utils/calculator";
import { calculatorContent as content } from "../content/calculatorContent";

export default function Kalkulator() {
  const [przychod, setPrzychod] = useState(content.defaults.monthlyRevenue);
  const [koszty, setKoszty] = useState(content.defaults.monthlyCosts);
  const [stawka, setStawka] = useState(content.defaults.flatRate);
  const [chorobowe, setChorobowe] = useState(content.defaults.sicknessInsurance);

  const {
    MIESIACE,
    ZUS_PREFERENCYJNY,
    zusSpolecznyRoczny,
    zdrowotnaRyczaltRoczna,
    podatekRyczaltRoczny,
    razemRyczaltRoczny,
    zdrowotnaSkalaRoczna,
    podatekSkalaRoczny,
    razemSkalaRoczny,
  } = calculateTaxComparison({
    monthlyRevenue: przychod,
    monthlyCosts: koszty,
    flatRate: stawka,
    sicknessInsurance: chorobowe,
  });

  const money = (value: number) =>
    Math.round(value).toLocaleString("pl-PL", { maximumFractionDigits: 0 });

  const ResultCard = ({
    eyebrow,
    title,
    accent,
    tax,
    health,
    social,
    total,
  }: {
    eyebrow: string;
    title: string;
    accent: "lime" | "orange";
    tax: number;
    health: number;
    social: number;
    total: number;
  }) => (
    <article className="border-2 border-cream/30 bg-paper text-ink flex flex-col h-full">
      <div className={`p-5 md:p-6 border-b-2 border-ink ${accent === "lime" ? "bg-lime" : "bg-orange"}`}>
        <div className="font-mono text-xs uppercase tracking-widest">{eyebrow}</div>
        <h3 className="font-display text-3xl md:text-4xl mt-1 uppercase">{title}</h3>
      </div>

      <div className="p-5 md:p-6">
        <div className="font-mono text-xs uppercase tracking-widest text-ink/60">{content.resultAverageLabel}</div>
        <div className="font-display text-4xl lg:text-5xl mt-2 leading-none">
          {money(total / MIESIACE)} <span className="text-orange text-xl">{content.monthlySuffix}</span>
        </div>
        <div className="font-mono text-xs text-ink/60 mt-3">
          {content.annuallyLabel} <strong className="text-ink">{money(total)} {content.inputCurrency}</strong>
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
            <span className="font-display text-base text-right whitespace-nowrap">{money((value as number) / MIESIACE)} {content.amountSuffix}</span>
            <span className="font-display text-base text-right whitespace-nowrap min-w-20">{money(value as number)} {content.amountSuffix}</span>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 items-baseline border-t-2 border-ink bg-ink text-cream px-5 md:px-6 py-4">
          <span className="font-mono text-xs uppercase text-lime">{content.resultRows.total}</span>
          <span className="font-display text-lg text-right whitespace-nowrap">{money(total / MIESIACE)} {content.amountSuffix}</span>
          <span className="font-display text-lg text-right whitespace-nowrap min-w-20">{money(total)} {content.amountSuffix}</span>
        </div>
      </div>
    </article>
  );

  return (
    <section id="kalkulator" className="border-b-2 border-ink bg-ink text-cream">
      <div className="px-5 md:px-10 py-16 md:py-24">
        <div className="font-mono text-xs uppercase tracking-widest text-lime">{content.sectionEyebrow}</div>
        <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85] tracking-tighter mt-4">
          {content.titleBeforeAccent} <span className="text-orange">{content.titleAccent}</span>
        </h2>
        <p className="mt-6 mb-12 text-lg md:text-xl text-cream/80">
          {content.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="border-2 border-cream/30 bg-cream text-ink p-5 md:p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-ink/60">{content.assumptionsEyebrow}</div>
            <h3 className="font-display text-3xl mt-2">{content.assumptionsTitle}</h3>

            <div className="mt-7 space-y-6">
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest">{content.revenueLabel}</span>
                <div className="mt-2 flex items-center border-2 border-ink bg-paper">
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={przychod}
                    onChange={(event) => setPrzychod(Math.max(0, Number(event.target.value)))}
                    className="w-full min-w-0 bg-transparent px-4 py-3 font-display text-2xl outline-none"
                  />
                  <span className="pr-4 font-mono text-xs font-bold">{content.inputCurrency}</span>
                </div>
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest">{content.costsLabel}</span>
                <div className="mt-2 flex items-center border-2 border-ink bg-paper">
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={koszty}
                    onChange={(event) => setKoszty(Math.max(0, Number(event.target.value)))}
                    className="w-full min-w-0 bg-transparent px-4 py-3 font-display text-2xl outline-none"
                  />
                  <span className="pr-4 font-mono text-xs font-bold">{content.inputCurrency}</span>
                </div>
                <span className="block mt-2 font-mono text-[10px] text-ink/50">{content.costsHint}</span>
              </label>

              <fieldset>
                <legend className="font-mono text-xs uppercase tracking-widest">{content.flatRateLabel}</legend>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[2, 3, 5.5, 8.5, 10, 12, 12.5, 14, 15, 17].map((rate) => (
                    <button
                      type="button"
                      key={rate}
                      onClick={() => setStawka(rate)}
                      aria-pressed={stawka === rate}
                      className={`font-mono text-xs px-3 py-2 border-2 ${
                        stawka === rate
                          ? "bg-ink text-lime border-ink"
                          : "border-ink/30 hover:border-ink"
                      }`}
                    >
                      {String(rate).replace(".", ",")}%
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="flex items-start gap-3 border-t-2 border-ink/20 pt-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chorobowe}
                  onChange={(event) => setChorobowe(event.target.checked)}
                  className="mt-0.5 size-5 accent-ink"
                />
                <span>
                  <span className="block font-mono text-xs uppercase tracking-widest">{content.sicknessLabel}</span>
                  <span className="block mt-1 font-mono text-[10px] text-ink/50">{content.sicknessHintBeforeAmount} {money(ZUS_PREFERENCYJNY)} {content.sicknessHintAfterAmount}</span>
                </span>
              </label>
            </div>
          </div>

          <ResultCard
            eyebrow={content.flatRateVariant.eyebrow}
            title={content.flatRateVariant.title}
            accent="lime"
            tax={podatekRyczaltRoczny}
            health={zdrowotnaRyczaltRoczna}
            social={zusSpolecznyRoczny}
            total={razemRyczaltRoczny}
          />

          <ResultCard
            eyebrow={content.scaleVariant.eyebrow}
            title={content.scaleVariant.title}
            accent="orange"
            tax={podatekSkalaRoczny}
            health={zdrowotnaSkalaRoczna}
            social={zusSpolecznyRoczny}
            total={razemSkalaRoczny}
          />
        </div>

        <div className="mt-6 border-t border-cream/20 pt-5 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px] leading-relaxed text-cream/60">
          {content.notes.map((note) => <p key={note}>{note}</p>)}
        </div>
      </div>
    </section>
  );
}
