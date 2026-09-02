# Audyt strony FirmaNaRyczalcie.pl

**Data audytu:** 2 września 2026  
**Zakres:** treści podatkowe, UX/UI, dostępność, SEO, kod, bezpieczeństwo i gotowość do publikacji.

## Podsumowanie

Projekt ma wyrazisty, spójny kierunek wizualny i poprawnie buduje się jako aplikacja React/Vite. Największym ryzykiem nie był kod, lecz **liczne nieprawidłowe lub zbyt kategoryczne informacje podatkowe**. W kopii roboczej poprawiono najważniejsze błędy merytoryczne, podstawy dostępności, metadane SEO i podatną wersję Vite.

Strona nadal **nie jest gotowa do publikacji**, dopóki nie zostaną uzupełnione prawdziwe dane kontaktowe, działające formularze/linki, dokumenty prawne i finalna weryfikacja treści przez doradcę podatkowego.

---

## P0 — blokery publikacji

### 1. Dane kontaktowe i firmowe są atrapami

W kodzie znajdują się:

- telefon `+48 500 000 000`,
- adres `ul. Podatkowa 12/4, 00-001 Warszawa`,
- NIP `000-000-00-00`,
- prawdopodobnie roboczy adres e-mail.

**Rekomendacja:** przed publikacją zastąpić je prawdziwymi danymi albo usunąć sekcję. Fałszywe dane na stronie usługowej podważają wiarygodność i mogą wprowadzać odbiorcę w błąd.

### 2. Przyciski konwersji nie realizują akcji

„Umów konsultację”, newsletter, social media i linki prawne prowadzą do `#`. Nie ma formularza ani integracji rezerwacji.

**Rekomendacja:** ustalić narzędzia docelowe (np. Calendly/Cal.com, formularz wysyłany do CRM, MailerLite/Brevo) i wdrożyć rzeczywiste ścieżki konwersji wraz ze stanami powodzenia i błędu.

### 3. Brak wymaganych treści prawnych i mechanizmu prywatności

Linki do regulaminu, polityki prywatności, RODO i cookies są puste. Jeśli zostaną dodane analityka, marketing lub osadzone usługi zewnętrzne, może być potrzebne zarządzanie zgodami.

**Rekomendacja:** przygotować dokumenty dopasowane do faktycznego administratora, formularzy i dostawców. Nie kopiować generycznych szablonów bez weryfikacji.

### 4. Treści powinien zatwierdzić ekspert podatkowy

Wersja wyjściowa myliła m.in. stawki 14%, 15% i 17%, termin wyboru formy, sposób liczenia składki zdrowotnej oraz limit zwolnienia z VAT. Najważniejsze błędy zostały poprawione, lecz dobór stawki zależy od faktycznie wykonywanych czynności i zwykle PKWiU — landing page nie powinien obiecywać jednej stawki wyłącznie na podstawie nazwy zawodu.

---

## P1 — ważne przed uruchomieniem

### Treść i kalkulator

1. Kalkulator pokazuje wyłącznie orientacyjny podatek od przychodu. Nie uwzględnia składek społecznych, odliczenia 50% zapłaconej składki zdrowotnej, ulg, wielu stawek ani rozliczeń kwartalnych.
2. Warto dodać osobny wynik składki zdrowotnej według progów oraz jasno rozdzielić „podatek”, „ZUS społeczny” i „składkę zdrowotną”.
3. Dobór stawki powinien być opisany jako orientacyjny. Bezpieczniejszy jest kreator pytań o rodzaj usługi/PKWiU niż wybór samego procentu.
4. Hasła „bez ukrytych pułapek”, „koniec historii”, „nic więcej nie robisz” i „tanie biuro rachunkowe” są atrakcyjne marketingowo, ale zbyt absolutne dla produktu podatkowego.
5. Od 2026 r. część podatników ryczałtu ma dodatkowe obowiązki dotyczące elektronicznej ewidencji/JPK — należy zdecydować, czy strona ma je omawiać.

### UX i konwersja

1. Brakuje mobilnego menu. Na małym ekranie użytkownik widzi tylko logo i CTA, bez dostępu do nawigacji sekcji.
2. Kontakt nie zawiera formularza, informacji o czasie odpowiedzi ani korzyści z konsultacji.
3. Strona jest długa, ale nie ma stałego CTA na urządzeniach mobilnych ani skróconej ścieżki dla użytkownika, który zna swoją branżę.
4. Brakuje elementów zaufania: informacji o osobie/firmie, kwalifikacji, sposobie świadczenia usługi, opinii klientów i jasno opisanego zakresu konsultacji.
5. Liczby marketingowe powinny mieć podane źródło i datę aktualizacji albo zostać usunięte.

### Dostępność

W kopii roboczej dodano:

- link „Przejdź do treści”,
- semantyczny element `main`,
- widoczny fokus klawiatury,
- `aria-expanded` i `aria-controls` w FAQ,
- obsługę `prefers-reduced-motion`.

Pozostało:

1. dodać nagłówki i podpis do tabeli stawek albo zastąpić ją semantyczną listą/kartami,
2. zweryfikować kolejność fokusu i kontrasty narzędziem automatycznym oraz ręcznie,
3. opisać emoji lub ukryć je przed czytnikiem ekranu, jeśli są dekoracyjne,
4. przetestować stronę przy powiększeniu 200–400%,
5. dodać poprawne etykiety/komunikaty do przyszłych formularzy.

### SEO

W kopii roboczej dodano podstawowy opis strony, Open Graph, robots i kolor motywu. Nadal potrzebne są:

1. prawidłowy adres kanoniczny po wyborze domeny,
2. grafika `og:image`, favicon i ikony aplikacji,
3. sitemap.xml i robots.txt,
4. dane strukturalne dopiero po podaniu prawdziwych danych firmy,
5. osobne podstrony/treści odpowiadające na konkretne intencje wyszukiwania,
6. strategia aktualizacji treści na kolejne lata.

---

## P2 — jakość techniczna

1. Strona została podzielona na komponenty, moduły treści oraz osobny, testowalny moduł obliczeniowy kalkulatora.
2. Dodano testy kalkulatora oraz wspólne polecenie `npm run check`, które uruchamia typecheck, testy i build. Nadal warto dodać ESLint, formatter i CI w GitHub Actions.
3. Brakuje jeszcze automatycznych testów interakcji formularza i FAQ.
4. Fonty są ładowane z Google Fonts. Dla stabilności, prywatności i wydajności warto hostować pliki fontów lokalnie.
5. `vite-plugin-singlefile` daje jeden duży plik HTML. Jest wygodny do prostego hostingu, ale ogranicza cache zasobów; przed produkcją warto potwierdzić, czy ten kompromis jest zamierzony.
6. Zależność Vite została podniesiona do 7.3.6; `npm audit` nie zgłasza obecnie podatności.
7. Produkcyjny build, testy i TypeScript należy uruchamiać automatycznie przy każdym pull requeście.

---

## Najważniejsze poprawki wprowadzone w kopii

- skorygowano tabelę stawek i dodano pominięte stawki 2%, 10% i 12,5%,
- wyjaśniono, że klasyfikacja opiera się na czynnościach/PKWiU, a nie samym PKD,
- poprawiono termin wyboru ryczałtu i termin PIT-28,
- poprawiono zasady i kwoty składki zdrowotnej na 2026 r.,
- poprawiono limit zwolnienia podmiotowego z VAT na 240 000 zł,
- złagodzono błędne przypisywanie stawek do zawodów,
- poprawiono disclaimer kalkulatora,
- usunięto niesprawdzoną liczbę firm z hero,
- dodano podstawy dostępności i SEO,
- zaktualizowano Vite.

---

## Źródła urzędowe użyte do weryfikacji

- Ministerstwo Finansów — stawki i limity PIT: https://www.podatki.gov.pl/podatki-firmowe/pit/stawki-i-limity
- Biznes.gov.pl — ryczałt od przychodów ewidencjonowanych: https://www.biznes.gov.pl/pl/portal/00263
- Biznes.gov.pl — wybór ryczałtu i terminy: https://www.biznes.gov.pl/pl/portal/ou1331
- ZUS — składka zdrowotna w 2026 r.: https://www.zus.pl/en/-/informacja-w-sprawie-podstawy-wymiaru-sk%C5%82adki-oraz-kwoty-sk%C5%82adki-na-ubezpieczenie-zdrowotne-w-2026-r.
- Ministerstwo Finansów — zwolnienie podmiotowe z VAT: https://www.podatki.gov.pl/podatki-firmowe/vat/poradniki-i-informatory/zwolnienie-podmiotowe-od-podatku-vat

> Audyt nie stanowi porady podatkowej ani prawnej. Finalne treści należy zatwierdzić z osobą posiadającą odpowiednie kwalifikacje i znajomość faktycznego modelu działalności.
