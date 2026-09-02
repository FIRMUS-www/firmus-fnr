# FirmaNaRyczalcie.pl

Landing page z porównaniem ryczałtu i skali podatkowej dla nowych działalności gospodarczych. Projekt korzysta z React, TypeScript, Vite i Tailwind CSS.

## Uruchomienie lokalne

Wymagany jest Node.js 20 lub nowszy.

```bash
npm ci
npm run dev
```

## Kontrola jakości

```bash
npm run check
```

Polecenie uruchamia kolejno:

- kontrolę TypeScript,
- testy kalkulatora,
- produkcyjny build.

## Build produkcyjny

```bash
npm run build
```

Gotowa strona trafia do katalogu `dist/`. Dzięki `vite-plugin-singlefile` wynik jest pojedynczym plikiem `dist/index.html`.

## Publikacja

Projekt można podłączyć do Cloudflare Pages, Vercel lub Netlify:

- build command: `npm run build`
- output directory: `dist`

Po wdrożeniu domenę dodaje się w panelu wybranej platformy, a następnie ustawia wskazane przez nią rekordy DNS u operatora domeny.

## Struktura

```text
src/
├── components/    # komponenty poszczególnych sekcji strony
├── content/       # stawki, FAQ, przykłady działalności i inne dane tekstowe
├── utils/         # logika kalkulatora i funkcje pomocnicze
├── App.tsx        # układ sekcji
├── index.css      # style globalne i motyw
└── main.tsx       # punkt wejścia aplikacji
```

Najczęściej aktualizowane treści znajdują się w `src/content/`:

- `rates.ts` — tabela stawek,
- `faq.ts` — pytania i odpowiedzi,
- `personas.ts` — przykłady działalności,
- `processSteps.ts` — etapy procesu,
- `facts.ts` — kafelki z faktami.

## Kalkulator

Czysta logika obliczeniowa znajduje się w `src/utils/calculator.ts`, a testy w `src/utils/calculator.test.ts`.

Model obejmuje pierwsze 12 miesięcy działalności według parametrów 2026:

- 6 miesięcy Ulgi na start,
- 6 miesięcy preferencyjnych składek społecznych,
- opcjonalne ubezpieczenie chorobowe,
- ryczałt z odliczeniem składek społecznych i 50% składki zdrowotnej,
- skalę podatkową z kosztami, składkami społecznymi i kwotą wolną.

Wyniki mają charakter orientacyjny i nie stanowią porady podatkowej.
