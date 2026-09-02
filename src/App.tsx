import { useState, useEffect } from "react";

// ---------------- NAV ----------------
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-cream">
      <div className="flex items-center justify-between px-5 md:px-10 py-4">
        <a href="#" className="flex items-baseline gap-2 group">
          <span className="font-display text-xl md:text-2xl tracking-tight">FIRMA<span className="text-orange">NA</span>RYCZAŁCIE</span>
          <span className="font-mono text-xs text-ink/60">#2026</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#stawki" className="hover:text-orange">Stawki</a>
          <a href="#kalkulator" className="hover:text-orange">Kalkulator</a>
          <a href="#dla-kogo" className="hover:text-orange">Dla kogo</a>
          <a href="#proces" className="hover:text-orange">Proces</a>
          <a href="#faq" className="hover:text-orange">FAQ</a>
        </nav>
        <a href="#kontakt" className="btn-invert bg-ink text-lime px-4 py-2 font-mono text-xs font-bold tracking-widest uppercase">
          Umów rozmowę →
        </a>
      </div>
    </header>
  );
}

// ---------------- HERO ----------------
function Hero() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative border-b-2 border-ink overflow-hidden">
      {/* Running top bar */}
      <div className="bg-ink text-cream font-mono text-xs overflow-hidden border-b-2 border-ink">
        <div className="flex whitespace-nowrap animate-marquee-slow py-2">
          {Array(4).fill(0).map((_, i) => (
            <span key={i} className="flex items-center gap-10 px-6">
              <span>● NAZWISK NIE POKAZUJEMY</span>
              <span className="text-lime">/</span>
              <span>PODATEK 12% / 8.5% / 15% / 17% / 3%</span>
              <span className="text-lime">/</span>
              <span>LIMIT 2 MLN EUR</span>
              <span className="text-lime">/</span>
              <span>BEZ KSIĘGI HANDLOWEJ</span>
              <span className="text-lime">/</span>
              <span>EDG#CEIDG#VAT</span>
              <span className="text-lime">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 px-5 md:px-10 pt-12 pb-16 md:pt-20 md:pb-24 gap-6">
        {/* Left column */}
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 bg-orange animate-blink"></span>
            <span className="font-mono text-xs uppercase tracking-widest">Wydanie 07 / Lato 2026</span>
            <span className="font-mono text-xs text-ink/50">— Warszawa, 14:37 CET</span>
          </div>

          <h1 className="font-display text-[17vw] md:text-[13vw] leading-[0.85] tracking-tighter">
            RYCZAŁT
            <span className="text-orange">.</span>
          </h1>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <p className="text-lg md:text-xl leading-snug max-w-md">
              Podatek, który <em className="font-semibold not-italic bg-lime px-1">nie bawi się</em> w księgowość kreatywną.
              Płacisz od przychodu. Koniec kropka. Reszta to szum.
            </p>
            <div className="font-mono text-xs text-ink/70 leading-relaxed border-t-2 border-ink pt-4">
              <div>PROGNOZA PRZYCHODU Q3 ↑</div>
              <div className="text-2xl font-bold text-ink mt-1">2 000 000,00 EUR</div>
              <div className="text-ink/50 mt-1">— limit ryczałtu 2026</div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#kalkulator" className="btn-invert bg-lime border-2 border-ink px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
              ▸ Oblicz swój podatek
            </a>
            <a href="#stawki" className="btn-invert bg-cream border-2 border-ink px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
              Sprawdź stawki
            </a>
          </div>
        </div>

        {/* Right column — clock + sticker */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
          <div className="border-2 border-ink bg-paper p-5 rotate-[-1deg]">
            <div className="font-mono text-xs text-ink/60 mb-1">TERAZ W POLSCE</div>
            <div className="font-display text-4xl tracking-tight">
              {time.toLocaleTimeString("pl-PL", { hour12: false })}
            </div>
            <div className="font-mono text-xs mt-2 text-ink/70">
              do końca roku podatkowego:<br/>
              <span className="text-orange font-bold">
                {Math.ceil((new Date(new Date().getFullYear(), 11, 31).getTime() - time.getTime()) / 86400000)} dni
              </span>
            </div>
          </div>

          <div className="border-2 border-ink bg-orange text-ink p-5 rotate-[2deg]">
            <div className="font-mono text-xs mb-1">⚠ UWAGA</div>
            <div className="font-display text-lg leading-tight">
              Składki ZUS w 2026 —<br/>
              <span className="bg-ink text-lime px-1">DUŻY ZUS vs MAŁY ZUS</span>
            </div>
            <div className="font-mono text-xs mt-2">zależy od przychodu 2025 →</div>
          </div>

          <div className="border-2 border-ink bg-ink text-cream p-5 -rotate-[1deg]">
            <div className="font-mono text-xs text-lime mb-1">#FAKT</div>
            <div className="font-sans text-sm leading-relaxed">
              Na ryczałcie <span className="bg-lime text-ink px-1 font-bold">nie odliczasz kosztów</span>.
              Ale za to nie musisz ich prowadzić. Wybór należy do Ciebie.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t-2 border-ink">
        {[
          { k: "1 032 451", l: "firm na ryczałcie w PL" },
          { k: "12%",    l: "IT · konsulting · prawo" },
          { k: "8.5%",   l: "usługi · handel · gastronomia" },
          { k: "3%",     l: "handel · budowlanka (wybrane)" },
        ].map((s, i) => (
          <div key={i} className={`px-5 md:px-8 py-6 ${i < 3 ? "border-r-2 border-ink" : ""}`}>
            <div className="font-display text-3xl md:text-5xl tracking-tight">{s.k}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink/60 mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- MANIFESTO ----------------
function Manifesto() {
  return (
    <section className="border-b-2 border-ink px-5 md:px-10 py-16 md:py-24">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="font-mono text-xs uppercase tracking-widest">§ 01 — manifest</div>
          <div className="font-display text-[10vw] md:text-8xl leading-none mt-4">NIE<br/>DOKŁA<br/>DAMY.</div>
        </div>
        <div className="col-span-12 md:col-span-9 md:pl-10">
          <p className="text-xl md:text-3xl font-display leading-[1.05] tracking-tight">
            Podatki w Polsce zmieniły się tyle razy, że nie pamiętamy już,
            ile było "ostatnich wielkich reform".<br/>
            <span className="text-orange">Ryczałt jest inny.</span><br/>
            Nie udaje skomplikowanego. Nie potrzebuje tłumacza z urzędniczego na ludzki.
            Bierzesz przychód, mnożysz przez stawkę. <span className="bg-lime px-1">Koniec historii.</span>
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Prosto", d: "Brak kosztów, brak amortyzacji, brak ewidencji szczegółowej." },
              { n: "02", t: "Szybko", d: "Płatne co miesiąc lub kwartalnie. Raz w roku — PIT-28." },
              { n: "03", t: "Tanio", d: "Bez biegłego rewidenta, bez drogiego biura rachunkowego." },
            ].map((c) => (
              <div key={c.n} className="border-2 border-ink p-5 bg-paper">
                <div className="font-mono text-xs text-ink/50">[{c.n}]</div>
                <div className="font-display text-3xl mt-2">{c.t}</div>
                <div className="font-mono text-sm mt-2 text-ink/80 leading-snug">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- STAWKI ----------------
function Stawki() {
  const rates = [
    { rate: "3%",   cat: "Pośrednictwo finansowe, handel, budowa budynków", tag: "NAJNIŻSZA" },
    { rate: "5.5%", cat: "Produkcja, przetwórstwo, roboty budowlane, gastronomia", tag: "NISKIE" },
    { rate: "8.5%", cat: "Usługi (większość): marketing, grafika, usługi IT (niekwalifikowane), najem prywatny", tag: "STANDARD" },
    { rate: "12%",  cat: "Informatyka, programowanie, doradztwo, zarządzanie, inżynieria", tag: "IT · CONSULTING" },
    { rate: "14%",  cat: "Freelance artystyczny, działalność rozrywkowa (wybrane)", tag: "KREATYWNE" },
    { rate: "15%",  cat: "Wolne zawody: lekarze, dentyści, adwokaci, radcowie", tag: "WOLNE ZAWODY" },
    { rate: "17%",  cat: "Zawody wymagające specjalistycznych kwalifikacji (wybrane)", tag: "EKSPERCI" },
  ];

  return (
    <section id="stawki" className="border-b-2 border-ink bg-ink text-cream">
      <div className="px-5 md:px-10 pt-16 md:pt-24 pb-6 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-lime">§ 02 — stawki ryczałtu</div>
          <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mt-3">
            ILE<br/>ZAPŁACISZ<span className="text-lime">?</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-cream/60 max-w-xs">
          Stawki obowiązujące od 01.01.2026. Źródło: ustawa o zryczałtowanym podatku dochodowym.
          Dobór stawki zależy od kodu PKD i rodzaju przychodu.
        </div>
      </div>

      <div className="px-5 md:px-10 pb-16 overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {rates.map((r, i) => (
              <tr key={i} className="group border-b border-cream/20 hover:bg-lime hover:text-ink transition-colors">
                <td className="font-mono text-cream/40 group-hover:text-ink/60 w-10 pr-4 py-5 align-top">
                  0{i + 1}
                </td>
                <td className="font-display text-6xl md:text-8xl tracking-tighter py-5 pr-8 align-top">
                  {r.rate}
                </td>
                <td className="font-sans text-base md:text-lg py-5 pr-6 align-top max-w-md">
                  {r.cat}
                </td>
                <td className="font-mono text-xs uppercase tracking-widest py-5 align-top whitespace-nowrap">
                  <span className="border border-cream/40 group-hover:border-ink/60 px-2 py-1">{r.tag}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ---------------- KALKULATOR ----------------
function Kalkulator() {
  const [przychod, setPrzychod] = useState(15000);
  const [stawka, setStawka] = useState(12);

  const podatekMies = Math.round((przychod * stawka) / 100);
  const podatekRok = podatekMies * 12;

  return (
    <section id="kalkulator" className="border-b-2 border-ink bg-lime">
      <div className="px-5 md:px-10 py-16 md:py-24 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest">§ 03 — kalkulator</div>
          <h2 className="font-display text-6xl md:text-7xl leading-[0.9] mt-3">
            POLICZ<br/>TO<br/>SAM<span className="text-orange">.</span>
          </h2>
          <p className="mt-6 font-sans text-base text-ink/80 max-w-sm leading-snug">
            Brak kosztów = brak ukrytych pułapek. Suwak w lewo, suwak w prawo —
            podatek zawsze przed Tobą. Żadnej magii.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8">
          <div className="bg-ink text-cream border-2 border-ink p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Inputs */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-lime">
                  Przychód miesięczny [PLN]
                </label>
                <div className="font-display text-5xl mt-2">
                  {przychod.toLocaleString("pl-PL")}
                  <span className="text-lime">.00</span>
                </div>
                <input
                  type="range" min={3000} max={166000} step={500}
                  value={przychod}
                  onChange={(e) => setPrzychod(Number(e.target.value))}
                  className="w-full mt-4 accent-lime"
                />
                <div className="flex justify-between font-mono text-xs text-cream/60 mt-1">
                  <span>3 000</span><span>166 000</span>
                </div>

                <label className="font-mono text-xs uppercase tracking-widest text-lime mt-8 block">
                  Stawka ryczałtu [%]
                </label>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[3, 5.5, 8.5, 12, 14, 15, 17].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStawka(s)}
                      className={`font-mono text-sm px-3 py-2 border-2 ${
                        stawka === s
                          ? "bg-lime text-ink border-lime"
                          : "border-cream/40 text-cream hover:border-lime"
                      }`}
                    >
                      {s}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="bg-cream text-ink p-6 border-2 border-lime">
                <div className="font-mono text-xs uppercase tracking-widest text-ink/60">Miesięczny podatek</div>
                <div className="font-display text-6xl md:text-7xl leading-none mt-1 tracking-tight">
                  {podatekMies.toLocaleString("pl-PL")}
                  <span className="text-orange"> PLN</span>
                </div>

                <div className="mt-6 pt-6 border-t-2 border-ink/20 flex justify-between items-baseline">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-ink/60">Rocznie</div>
                    <div className="font-display text-3xl">{podatekRok.toLocaleString("pl-PL")} PLN</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs uppercase tracking-widest text-ink/60">Efektywnie</div>
                    <div className="font-display text-3xl">{stawka}%</div>
                  </div>
                </div>

                <div className="mt-6 font-mono text-xs text-ink/60">
                  * bez składek ZUS i składki zdrowotnej (9% od dochodu).
                  Kalkulator uproszczony — pełna kalkulacja wymaga konsultacji.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- DLA KOGO ----------------
function DlaKogo() {
  const personas = [
    { tag: "PROGRAMISTA", t: "Koder z L4", d: "12% ryczałtu. Bez kosztów? Bez problemu — i tak pracuje w kapciach.", emoji: "💻" },
    { tag: "GRAFIK / UX", t: "Pixel-perfect", d: "8.5% od usług projektowych. Portfolio ważniejsze niż ewidencja.", emoji: "🎨" },
    { tag: "KONSULTANT", t: "Doradca B2B", d: "12% — niezależnie czy doradzasz w zarządzaniu, HR czy procesach.", emoji: "🧠" },
    { tag: "LEKARZ", t: "Wolny zawód", d: "14% od prywatnej praktyki. Bez amortyzacji sprzętu medycznego.", emoji: "🩺" },
    { tag: "HANDLOWIEC", t: "E-commerce", d: "3% od handlu — niski marża, niski ryczałt. Matematyka się zgadza.", emoji: "📦" },
    { tag: "KOPRAJTER", t: "Słowo pisane", d: "14% od twórczości. Bo inspiracja nie odlicza się od podatku.", emoji: "✍️" },
  ];

  return (
    <section id="dla-kogo" className="border-b-2 border-ink px-5 md:px-10 py-16 md:py-24">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest">§ 04 — dla kogo</div>
          <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mt-3">
            NIE DLA<br/>KAŻDEGO<span className="text-orange">.</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-ink/60 max-w-xs">
          Ryczałt nie jest uniwersalny. Sprawdź, czy do Ciebie pasuje —
          zanim złożysz oświadczenie (termin: 20 stycznia lub pierwszy dzień działalności).
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {personas.map((p, i) => (
          <div key={i} className={`border-2 border-ink p-6 md:p-8 group hover:bg-ink hover:text-cream transition-colors ${i % 3 !== 2 ? "lg:border-r-2 lg:-ml-[2px]" : ""} ${i < personas.length - 3 ? "border-b-0 md:border-b-2 lg:border-b-2 -mt-[2px] lg:mt-0 md:-mt-[2px]" : ""}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="text-5xl">{p.emoji}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest border border-current px-2 py-1">
                {p.tag}
              </div>
            </div>
            <div className="font-display text-3xl md:text-4xl leading-tight">{p.t}</div>
            <div className="font-mono text-sm mt-3 opacity-80 leading-snug">{p.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- PROCES ----------------
function Proces() {
  const steps = [
    { n: "01", t: "Wybór formy", d: "Decyzja o ryczałcie — oświadczenie w urzędzie skarbowym do 20 stycznia lub przy rejestracji." },
    { n: "02", t: "Rejestracja", d: "CEIDG lub KRS. Nadanie NIP/REGON. Zgłoszenie do ZUS (ZUA/ZZA)." },
    { n: "03", t: "Ewidencja", d: "Prowadzisz uproszczoną ewidencję przychodów. Nie ewidencjonujesz kosztów." },
    { n: "04", t: "Płatność", d: "Co miesiąc do 20. dnia — podatek za poprzedni miesiąc. Bez PIT-5, bez zaliczek." },
    { n: "05", t: "Rozliczenie roczne", d: "PIT-28 do 31 stycznia następnego roku. Koniec. Nic więcej nie robisz." },
  ];

  return (
    <section id="proces" className="border-b-2 border-ink bg-paper px-5 md:px-10 py-16 md:py-24">
      <div className="font-mono text-xs uppercase tracking-widest mb-3">§ 05 — proces</div>
      <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mb-12">
        OD ZERA<br/>DO PIT-28<span className="text-lime">.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        {steps.map((s, i) => (
          <div key={s.n} className={`border-2 border-ink p-5 md:p-6 ${i < steps.length - 1 ? "md:border-r-2 md:-mr-[2px]" : ""} ${i % 2 === 0 ? "bg-cream" : "bg-lime"}`}>
            <div className="font-display text-7xl md:text-8xl leading-none">{s.n}</div>
            <div className="font-display text-2xl mt-4 uppercase tracking-tight">{s.t}</div>
            <div className="font-mono text-xs mt-3 text-ink/80 leading-snug">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- FAKTY / LICZBY ----------------
function Fakty() {
  const facts = [
    { k: "15.01.2026", v: "ostatni dzień na wybór ryczałtu wstecz za 2026" },
    { k: "9%",       v: "składka zdrowotna — nieodliczalna, ale od dochodu (przychód − ZUS)" },
    { k: "30.04.2027", v: "termin złożenia PIT-28 za rok 2026" },
    { k: "0 PLN",    v: "amortyzacji — nie odliczasz leasingu, paliwa ani laptopa" },
  ];

  return (
    <section className="border-b-2 border-ink px-5 md:px-10 py-16 md:py-20 bg-cream-dark">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {facts.map((f, i) => (
          <div key={i} className={`border-2 border-ink p-5 md:p-7 ${i < facts.length - 1 ? "md:border-r-2 md:-mr-[2px]" : ""} ${i % 2 === 0 ? "bg-cream-dark" : "bg-cream"}`}>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink/60 mb-2">FAKT #{String(i+1).padStart(2, "0")}</div>
            <div className="font-display text-3xl md:text-5xl leading-none tracking-tight">{f.k}</div>
            <div className="font-mono text-xs mt-3 text-ink/80 leading-snug">{f.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- FAQ ----------------
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: "Czy na ryczałcie mogę odliczać koszty?", a: "Nie. To istota ryczałtu — płacisz od przychodu, nie od dochodu. Nie prowadzisz kosztów, nie amortyzujesz, nie odliczasz wydatków. W zamian dostajesz prostotę." },
    { q: "A składka zdrowotna?", a: "To inna historia — wynosi 9% od dochodu (przychód minus zapłacony ZUS społeczny). Jest nieodliczalna od podatku, więc realnie podnosi efektywną stawkę." },
    { q: "Kiedy nie mogę skorzystać z ryczałtu?", a: "M.in. gdy w roku poprzednim prowadzisz działalność z małżonkiem na wspólności majątkowej i stosujecie inny podatek, gdy przekroczysz limit 2 mln EUR, lub gdy działasz w określonych branżach (np. apteki, handel częściami samochodowymi)." },
    { q: "Czy mogę wrócić do skali podatkowej?", a: "Tak — zmieniasz formę opodatkowania co rok, składając oświadczenie do 20 stycznia następnego roku. Nie możesz wracać w trakcie roku." },
    { q: "Czy ryczałt to zawsze najtaniej?", a: "Zależy. Przy wysokich kosztach (leasing samochodu, wynajem biura) ryczałt może być droższy niż skala czy liniowy. Przy niskich kosztach — wygrywa bezapelacyjnie." },
    { q: "Co z VAT?", a: "Ryczałt to podatek dochodowy — VAT to zupełnie inny podatek. Możesz być zwolniony z VAT (do 200 000 zł obrotu) lub być VAT-owcem. To niezależne wybory." },
  ];

  return (
    <section id="faq" className="border-b-2 border-ink px-5 md:px-10 py-16 md:py-24">
      <div className="font-mono text-xs uppercase tracking-widest mb-3">§ 06 — pytania</div>
      <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mb-10">
        PYTANIA,<br/>KTÓRE<br/>ZADAJESZ<span className="text-orange">.</span>
      </h2>

      <div className="border-t-2 border-ink">
        {items.map((it, i) => (
          <div key={i} className="border-b-2 border-ink">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-5 md:py-7 text-left group"
            >
              <div className="flex items-start gap-4 md:gap-6">
                <span className="font-mono text-xs text-ink/50 pt-1">0{i + 1}</span>
                <span className="font-display text-xl md:text-3xl leading-tight tracking-tight">{it.q}</span>
              </div>
              <span className={`font-display text-4xl md:text-5xl transition-transform ${open === i ? "rotate-45 text-orange" : ""}`}>+</span>
            </button>
            {open === i && (
              <div className="pb-6 pl-0 md:pl-14 pr-12 font-mono text-sm text-ink/80 leading-relaxed max-w-3xl">
                {it.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- CTA KONTAKT ----------------
function Kontakt() {
  return (
    <section id="kontakt" className="border-b-2 border-ink bg-ink text-cream">
      <div className="px-5 md:px-10 py-16 md:py-24">
        <div className="font-mono text-xs uppercase tracking-widest text-lime mb-3">§ 07 — kontakt</div>
        <h2 className="font-display text-[13vw] md:text-[11vw] leading-[0.85] tracking-tighter">
          POGADAJMY<br/>
          O <span className="text-lime">TWOIM</span><br/>
          RYCZAŁCIE<span className="text-orange">.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-cream p-6">
            <div className="font-mono text-xs text-lime mb-2">MAIL</div>
            <a href="mailto:czesc@firmanaryczalcie.pl" className="font-display text-xl md:text-2xl hover:text-lime transition-colors break-all">
              czesc@firmanaryczalcie.pl
            </a>
          </div>
          <div className="border-2 border-cream p-6">
            <div className="font-mono text-xs text-lime mb-2">TELEFON</div>
            <a href="tel:+48500000000" className="font-display text-xl md:text-2xl hover:text-lime transition-colors">
              +48 500 000 000
            </a>
          </div>
          <div className="border-2 border-cream p-6">
            <div className="font-mono text-xs text-lime mb-2">BIURO</div>
            <div className="font-display text-xl md:text-2xl">
              ul. Podatkowa 12/4<br/>00-001 Warszawa
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#" className="btn-invert bg-lime text-ink border-2 border-lime px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
            Umów konsultację 45 min
          </a>
          <a href="#" className="btn-invert bg-transparent text-cream border-2 border-cream px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
            Newsletter (1x w miesiącu)
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------------- FOOTER ----------------
function Footer() {
  return (
    <footer className="bg-ink text-cream">
      {/* Giant wordmark */}
      <div className="border-b border-cream/20 overflow-hidden">
        <div className="font-display text-[22vw] leading-[0.8] tracking-tighter text-cream/5 px-5 py-4 whitespace-nowrap">
          FIRMA<span className="text-orange/30">NA</span>RYCZAŁCIE
        </div>
      </div>

      <div className="px-5 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">© 2026</div>
          <div className="font-sans text-cream/80 leading-snug">
            FirmaNaRyczalcie.pl<br/>
            NIP 000-000-00-00<br/>
            Wpis do CEIDG
          </div>
        </div>
        <div>
          <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">DZIAŁY</div>
          <ul className="space-y-1">
            <li><a href="#stawki" className="hover:text-lime">Stawki</a></li>
            <li><a href="#kalkulator" className="hover:text-lime">Kalkulator</a></li>
            <li><a href="#dla-kogo" className="hover:text-lime">Dla kogo</a></li>
            <li><a href="#faq" className="hover:text-lime">FAQ</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">SOCIAL</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-lime">LinkedIn ↗</a></li>
            <li><a href="#" className="hover:text-lime">Bluesky ↗</a></li>
            <li><a href="#" className="hover:text-lime">YouTube ↗</a></li>
            <li><a href="#" className="hover:text-lime">RSS ↗</a></li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs text-lime uppercase tracking-widest mb-3">PRAWNE</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-lime">Regulamin</a></li>
            <li><a href="#" className="hover:text-lime">Polityka prywatności</a></li>
            <li><a href="#" className="hover:text-lime">RODO</a></li>
            <li><a href="#" className="hover:text-lime">Cookies</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/20 px-5 md:px-10 py-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-cream/60">
        <div>Treści mają charakter informacyjny — nie stanowią porady podatkowej.</div>
        <div>Wydanie 07 · lato 2026 · Warszawa</div>
      </div>
    </footer>
  );
}

// ---------------- APP ----------------
export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink selection:bg-lime">
      <Nav />
      <Hero />
      <Manifesto />
      <Stawki />
      <Kalkulator />
      <DlaKogo />
      <Proces />
      <Fakty />
      <FAQ />
      <Kontakt />
      <Footer />
    </div>
  );
}
