import { useState } from "react";
import { calculateTaxComparison } from "../utils/calculator";

export default function Kalkulator() {
  const [przychod, setPrzychod] = useState(10000);
  const [koszty, setKoszty] = useState(1000);
  const [stawka, setStawka] = useState(8.5);
  const [chorobowe, setChorobowe] = useState(true);

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
        <div className="font-mono text-xs uppercase tracking-widest text-ink/60">Średnio</div>
        <div className="font-display text-4xl lg:text-5xl mt-2 leading-none">
          {money(total / MIESIACE)} <span className="text-orange text-xl">PLN / mies.</span>
        </div>
        <div className="font-mono text-xs text-ink/60 mt-3">
          Rocznie: <strong className="text-ink">{money(total)} PLN</strong>
        </div>
      </div>

      <div className="mt-auto border-t-2 border-ink">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-5 md:px-6 py-3 font-mono text-[10px] uppercase tracking-wider text-ink/50">
          <span>Składnik</span><span>mies.</span><span>12 mies.</span>
        </div>
        {[
          ["Podatek", tax],
          ["Zdrowotna", health],
          ["ZUS społeczny", social],
        ].map(([label, value]) => (
          <div key={label as string} className="grid grid-cols-[1fr_auto_auto] gap-x-3 items-baseline border-t border-ink/20 px-5 md:px-6 py-4">
            <span className="font-mono text-xs uppercase">{label}</span>
            <span className="font-display text-base text-right whitespace-nowrap">{money((value as number) / MIESIACE)} zł</span>
            <span className="font-display text-base text-right whitespace-nowrap min-w-20">{money(value as number)} zł</span>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 items-baseline border-t-2 border-ink bg-ink text-cream px-5 md:px-6 py-4">
          <span className="font-mono text-xs uppercase text-lime">Razem</span>
          <span className="font-display text-lg text-right whitespace-nowrap">{money(total / MIESIACE)} zł</span>
          <span className="font-display text-lg text-right whitespace-nowrap min-w-20">{money(total)} zł</span>
        </div>
      </div>
    </article>
  );

  return (
    <section id="kalkulator" className="border-b-2 border-ink bg-ink text-cream">
      <div className="px-5 md:px-10 py-16 md:py-24">
        <div className="font-mono text-xs uppercase tracking-widest text-lime">§ 02 — kalkulator opłacalności</div>
        <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85] tracking-tighter mt-4">
          POLICZMY <span className="text-orange">TO</span>
        </h2>
        <p className="mt-6 mb-12 text-lg md:text-xl text-cream/80">
          Wprowadź realistyczne dane, aby otrzymać wynik możliwie bliski rzeczywistym obciążeniom.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="border-2 border-cream/30 bg-cream text-ink p-5 md:p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-ink/60">Założenia</div>
            <h3 className="font-display text-3xl mt-2">DANE FIRMY</h3>

            <div className="mt-7 space-y-6">
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest">Średni miesięczny przychód</span>
                <div className="mt-2 flex items-center border-2 border-ink bg-paper">
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={przychod}
                    onChange={(event) => setPrzychod(Math.max(0, Number(event.target.value)))}
                    className="w-full min-w-0 bg-transparent px-4 py-3 font-display text-2xl outline-none"
                  />
                  <span className="pr-4 font-mono text-xs font-bold">PLN</span>
                </div>
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest">Średnie miesięczne koszty</span>
                <div className="mt-2 flex items-center border-2 border-ink bg-paper">
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={koszty}
                    onChange={(event) => setKoszty(Math.max(0, Number(event.target.value)))}
                    className="w-full min-w-0 bg-transparent px-4 py-3 font-display text-2xl outline-none"
                  />
                  <span className="pr-4 font-mono text-xs font-bold">PLN</span>
                </div>
                <span className="block mt-2 font-mono text-[10px] text-ink/50">Koszty nie wpływają na podstawę ryczałtu.</span>
              </label>

              <fieldset>
                <legend className="font-mono text-xs uppercase tracking-widest">Stawka ryczałtu</legend>
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
                  <span className="block font-mono text-xs uppercase tracking-widest">Dobrowolne chorobowe</span>
                  <span className="block mt-1 font-mono text-[10px] text-ink/50">Preferencyjny ZUS: {money(ZUS_PREFERENCYJNY)} zł przez miesiące 7–12.</span>
                </span>
              </label>
            </div>
          </div>

          <ResultCard
            eyebrow="Ryczałt ewidencjonowany"
            title="Ryczałt"
            accent="lime"
            tax={podatekRyczaltRoczny}
            health={zdrowotnaRyczaltRoczna}
            social={zusSpolecznyRoczny}
            total={razemRyczaltRoczny}
          />

          <ResultCard
            eyebrow="Skala podatkowa"
            title="Skala"
            accent="orange"
            tax={podatekSkalaRoczny}
            health={zdrowotnaSkalaRoczna}
            social={zusSpolecznyRoczny}
            total={razemSkalaRoczny}
          />
        </div>

        <div className="mt-6 border-t border-cream/20 pt-5 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px] leading-relaxed text-cream/60">
          <p>Model pierwszych 12 miesięcy według parametrów 2026: 6 miesięcy Ulgi na start, następnie 6 miesięcy preferencyjnego ZUS.</p>
          <p>Skala zakłada rozliczenie indywidualne, brak innych dochodów opodatkowanych skalą i pełną kwotę wolną 30 000 zł.</p>
          <p>Wyniki są szacunkiem dla równych miesięcy. Wpisuj kwoty bez VAT. Kalkulator nie uwzględnia ulg, strat ani wspólnego rozliczenia.</p>
        </div>
      </div>
    </section>
  );
}
