import type { ContributionStage } from "../utils/calculator";

export const calculatorContent = {
  sectionEyebrow: "§ 02 — kalkulator opłacalności",
  titleBeforeAccent: "POLICZMY",
  titleAccent: "TO",
  description:
    "Wprowadź realistyczne dane i porównaj obciążenia na kolejnych etapach opłacania składek.",
  stageSelectorEyebrow: "Etap opłacania składek",
  stages: [
    {
      id: "start" as ContributionStage,
      shortLabel: "Miesiące 1–6",
      title: "ULGA NA START",
      description: "Bez składek społecznych. Nadal opłacasz składkę zdrowotną i podatek.",
    },
    {
      id: "preferential" as ContributionStage,
      shortLabel: "Miesiące 7–30",
      title: "ZUS PREFERENCYJNY",
      description: "Preferencyjne składki społeczne przez kolejne 24 miesiące.",
    },
    {
      id: "standard" as ContributionStage,
      shortLabel: "Od 31. miesiąca",
      title: "STANDARDOWY ZUS",
      description: "Standardowe składki społeczne po zakończeniu okresu preferencji.",
    },
  ],
  assumptionsEyebrow: "Założenia",
  assumptionsTitle: "DANE FIRMY",
  revenueLabel: "Średni miesięczny przychód",
  costsLabel: "Średnie miesięczne koszty",
  costsHint: "Koszty nie wpływają na podstawę ryczałtu.",
  flatRateLabel: "Stawka ryczałtu",
  sicknessLabel: "Dobrowolne chorobowe",
  sicknessStartHint: "Na Uldze na start przełącznik nie wpływa na wynik — składek społecznych nie opłacasz.",
  sicknessAmountPrefix: "Składki społeczne w wybranym etapie:",
  resultAverageLabel: "Średnio miesięcznie",
  monthlySuffix: "PLN / mies.",
  annualEquivalentLabel: "Ekwiwalent 12 miesięcy:",
  inputCurrency: "PLN",
  amountSuffix: "zł",
  columns: {
    component: "Składnik",
    monthly: "mies.",
    annual: "12 mies.",
  },
  resultRows: {
    tax: "Podatek",
    health: "Zdrowotna",
    social: "ZUS społeczny",
    total: "Razem",
  },
  flatRateVariant: {
    eyebrow: "Ryczałt ewidencjonowany",
    title: "Ryczałt",
  },
  scaleVariant: {
    eyebrow: "Skala podatkowa",
    title: "Skala",
  },
  summary: {
    eyebrow: "Porównanie etapów",
    title: "ILE ŚREDNIO MIESIĘCZNIE?",
    flatRate: "Ryczałt",
    scale: "Skala",
    cheaper: "Niższe obciążenie",
    flatRateWins: "Ryczałt",
    scaleWins: "Skala",
    tie: "Tyle samo",
  },
  smallZusPlusNote:
    "Po 30. miesiącu część przedsiębiorców może spełniać warunki Małego ZUS Plus. Kalkulator przyjmuje standardowy ZUS, ponieważ Mały ZUS Plus zależy m.in. od dochodu z poprzedniego roku i indywidualnych warunków.",
  notes: [
    "Wszystkie trzy etapy są porównywane według stawek i parametrów 2026. To porównanie dzisiejszych obciążeń, a nie prognoza wysokości przyszłych składek.",
    "Kwota dla 12 miesięcy jest ekwiwalentem porównawczym przy niezmiennych danych. Ulga na start faktycznie trwa 6 pełnych miesięcy, a preferencyjne składki społeczne 24 miesiące.",
    "Skala zakłada rozliczenie indywidualne, brak innych dochodów opodatkowanych skalą i pełną kwotę wolną 30 000 zł. Wynik nie uwzględnia ulg, strat, zawieszenia działalności ani wspólnego rozliczenia.",
  ],
  defaults: {
    monthlyRevenue: 10_000,
    monthlyCosts: 1_000,
    flatRate: 8.5,
    sicknessInsurance: true,
    contributionStage: "start" as ContributionStage,
  },
};
