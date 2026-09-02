import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Zmiany2027 from "./components/Zmiany2027";
import Stawki from "./components/Stawki";
import Kalkulator from "./components/Kalkulator";
import DlaKogo from "./components/DlaKogo";
import Proces from "./components/Proces";
import Fakty from "./components/Fakty";
import FAQ from "./components/FAQ";
import Kontakt from "./components/Kontakt";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink selection:bg-lime">
      <Nav />
      <main id="main">
        <Hero />
        <Zmiany2027 />
        <Stawki />
        <Kalkulator />
        <DlaKogo />
        <Proces />
        <Fakty />
        <FAQ />
        <Kontakt />
      </main>
      <Footer />
    </div>
  );
}
