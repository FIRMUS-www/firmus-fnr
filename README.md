# FirmaNaRyczalcie.pl

Statyczna strona z porównaniem ryczałtu i skali podatkowej dla nowych działalności gospodarczych. Projekt korzysta z React, TypeScript, Vite i Tailwind CSS.

## Treści strony

Teksty, etykiety i dane widoczne na stronie są w `src/content/`. Dzięki temu ich aktualizacja nie wymaga szukania tekstu w komponentach odpowiedzialnych za wygląd.

- `navigation.ts` — marka, menu, przycisk i odnośnik dostępnościowy,
- `hero.ts` — pasek informacji, claim, CTA i trzy karty Hero,
- `news.ts` — informacje o planowanych zmianach od 2027 r.,
- `rates.ts` — tabela stawek i formularz doboru stawki,
- `calculatorContent.ts` — teksty oraz wartości początkowe kalkulatora,
- `personas.ts` — przykłady działalności,
- `processSteps.ts` — etapy procesu,
- `facts.ts` — kafelki z faktami,
- `faq.ts` — pytania i odpowiedzi,
- `contact.ts` — sekcja kontaktowa,
- `footer.ts` — stopka.

Komponenty w `src/components/` odpowiadają przede wszystkim za układ, wygląd i zachowanie strony. Logika obliczeniowa kalkulatora znajduje się w `src/utils/calculator.ts`, a jej testy w `src/utils/calculator.test.ts`.

## Kontrola jakości i build

Wymagany jest Node.js 20 lub nowszy.

```bash
npm ci
npm run check
```

`npm run check` wykonuje kontrolę TypeScript, testy kalkulatora i produkcyjny build. Gotowa strona trafia do `dist/`. Dzięki `vite-plugin-singlefile` wynik jest pojedynczym plikiem `dist/index.html`.

## Automatyczna publikacja na SEOHost

Workflow `.github/workflows/deploy-seohost.yml` uruchamia się po każdej zmianie zapisanej na gałęzi `main` oraz ręcznie z zakładki **Actions**. Kolejno:

1. pobiera źródła,
2. wykonuje `npm ci`, testy, kontrolę TypeScript i `npm run build`,
3. przesyła zawartość `dist/` do katalogu domeny na hostingu SEOHost.

Jeżeli dane dostępowe nie są jeszcze skonfigurowane, workflow zbuduje i sprawdzi stronę, ale bezpiecznie pominie publikację.

### Sekrety GitHub

W repozytorium wejdź kolejno w:

**Settings → Secrets and variables → Actions → New repository secret**

Dodaj:

| Nazwa sekretu | Co wpisać |
|---|---|
| `SEOHOST_FTP_SERVER` | serwer FTP pokazany w DirectAdmin/SEOHost |
| `SEOHOST_FTP_USERNAME` | pełny login konta FTP |
| `SEOHOST_FTP_PASSWORD` | hasło konta FTP |
| `SEOHOST_FTP_DIRECTORY` | dokładny katalog WWW domeny, koniecznie zakończony `/` |
| `SEOHOST_FTP_PROTOCOL` | opcjonalnie `ftps`; przy braku tej wartości używane jest `ftp` |

Danych dostępowych nie wpisuj do kodu ani do plików projektu.

Przed podaniem katalogu docelowego sprawdź go w DirectAdmin. Często ma postać `/domains/firmanaryczalcie.pl/public_html/`, ale nie należy jej przyjmować bez potwierdzenia w panelu lub u pomocy SEOHost. W tym katalogu może już znajdować się domyślny plik `index.html`; publikacja projektu zastąpi plik o tej samej nazwie.

Po dodaniu sekretów otwórz **Actions → Build and deploy to SEOHost → Run workflow**, aby wykonać pierwszą publikację bez czekania na kolejną zmianę w projekcie.

## Model kalkulatora

Kalkulator obejmuje pierwsze 12 miesięcy działalności według parametrów 2026:

- 6 miesięcy Ulgi na start,
- 6 miesięcy preferencyjnych składek społecznych,
- opcjonalne ubezpieczenie chorobowe,
- ryczałt z odliczeniem składek społecznych i 50% składki zdrowotnej,
- skalę podatkową z kosztami, składkami społecznymi i kwotą wolną.

Wyniki mają charakter orientacyjny i nie stanowią porady podatkowej.
