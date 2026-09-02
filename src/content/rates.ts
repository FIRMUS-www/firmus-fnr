export const rates: { rate: string; cat: string; tag: string }[] = [
    { rate: "2%",   cat: "Sprzedaż produktów spożywczych przetworzonych we własnym gospodarstwie.", tag: "ROLNICTWO" },
    { rate: "3%",   cat: "M.in. handel i gastronomia bez sprzedaży alkoholu powyżej 1,5%", tag: "HANDEL" },
    { rate: "5,5%", cat: "M.in. działalność wytwórcza i roboty budowlane", tag: "PRODUKCJA · BUDOWA" },
    { rate: "8,5%", cat: "M.in. wybrane usługi i edukacja; zakres zależy od faktycznie wykonywanych czynności", tag: "WYBRANE USŁUGI" },
    { rate: "10%",  cat: "Kupno i sprzedaż nieruchomości na własny rachunek", tag: "NIERUCHOMOŚCI" },
    { rate: "12%",  cat: "Wybrane usługi informatyczne wskazane w ustawie", tag: "WYBRANE IT" },
    { rate: "12,5%", cat: "M.in. nadwyżka ponad 100 tys. zł z najmu i usług zakwaterowania", tag: "PRÓG 100 TYS." },
    { rate: "14%",  cat: "M.in. opieka zdrowotna, architektura, inżynieria i specjalistyczne projektowanie", tag: "ZDROWIE · PROJEKT" },
    { rate: "15%",  cat: "M.in. reklama, fotografia, pośrednictwo hurtowe i wybrane usługi niematerialne", tag: "USŁUGI NIEMATERIALNE" },
    { rate: "17%",  cat: "Przychody osiągane w zakresie wolnych zawodów", tag: "WOLNE ZAWODY" },
  ];

export const ratesSectionContent = {
  eyebrow: "§ 01 — stawki ryczałtu",
  titleLine1: "ILE",
  titleLine2: "ZAPŁACISZ",
  description:
    "Stawki według przepisów obowiązujących w 2026 r. Dobór stawki zależy od faktycznie wykonywanych czynności i zwykle od klasyfikacji PKWiU — nie od samego kodu PKD.",
  ctaText:
    "Potrzebujesz pomocy w dokładnym określeniu stawki oraz kodów PKD i klasyfikacji PKWiU?",
  ctaLabel: "Dobierz stawkę →",
  form: {
    eyebrow: "Krótki formularz",
    title: "Dobierz stawkę",
    description:
      "Opisz, czym zajmuje się Twoja firma. Na tej podstawie zweryfikujemy stawkę ryczałtu oraz właściwe klasyfikacje.",
    emailLabel: "Twój e-mail",
    emailPlaceholder: "nazwa@firma.pl",
    activityLabel: "Czym zajmuje się firma?",
    activityPlaceholder: "Opisz świadczone usługi lub sprzedawane produkty…",
    codesLabel: "Posiadane kody PKD lub PKWiU — opcjonalnie",
    codesPlaceholder: "Np. PKD 62.01.Z",
    submitLabel: "Wyślij zgłoszenie →",
    closeLabel: "Zamknij formularz",
    emailSubject: "Dobór stawki ryczałtu",
    recipient: "czesc@firmanaryczalcie.pl",
    emailBodyLabels: {
      email: "E-mail",
      activity: "Opis działalności",
      codes: "Posiadane kody PKD / PKWiU",
      noCodes: "Nie podano",
    },
  },
};
