
import { useState, useRef, useEffect } from 'react'
import './App.css'

const alfabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVWXYZŹŻ";

function szyfruj(znak, przesuniecie) {
  const pozycja = alfabet.indexOf(znak);

  if (pozycja === -1) {
    return znak;
  }

  const wynik = (pozycja + przesuniecie) % alfabet.length;

  return alfabet[wynik];
}

// Komponent pojedynczego okienka
function Okienko({ znak, przesuniecie, zaszyfrowane, animowane, opoznienie }) {
  const pozycja = alfabet.indexOf(znak);

  if (pozycja === -1) {
    return <div className="okienko">{znak}</div>;
  }

  const pozycjaPoPrzesunieciu =
    pozycja + (zaszyfrowane ? przesuniecie : 0);

  return (
    <div className={`okienko ${zaszyfrowane ? 'zaszyfrowane' : ''} ${animowane ? 'animowane' : ''}`}>
      <div
        className="pasekLiter"
        style={{
          transform: `translateY(-${pozycjaPoPrzesunieciu * 40}px)`,
          transitionDelay: `${opoznienie}s`
        }}
      >
        {(alfabet + alfabet).split("").map((litera, index) => (
          <div className="litera" key={index}>
            {litera}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [tekst, setTekst] = useState('PIEROGI');
  const [przesuniecie, setPrzesuniecie] = useState(3);
  const [indexZaszyfrowanego, setIndexZaszyfrowanego] = useState(0);
  const [czySzyfrowanie, setCzySzyfrowanie] = useState(false);
  const [indexAktywnego, setIndexAktywnego] = useState(-1);

  const timeoutRef = useRef([]);

  const zaszyfrowanyTekst = tekst
    .split("")
    .slice(0, indexZaszyfrowanego)
    .map((znak) => szyfruj(znak, przesuniecie))
    .join("");

  // Szyfrowanie następnej litery
  function szyfrujNastepnaLitere() {
    if (czySzyfrowanie) return;

    if (indexZaszyfrowanego < tekst.length) {
      setIndexAktywnego(indexZaszyfrowanego);
      setIndexZaszyfrowanego(indexZaszyfrowanego + 1);
    }
  }

  // Szyfrowanie całego tekstu po kolei
  function szyfrujCalosc() {
    if (czySzyfrowanie) return;

    const pozostaleLitery = tekst.length - indexZaszyfrowanego;

    if (pozostaleLitery === 0) return;

    setCzySzyfrowanie(true);

    const poczatek = indexZaszyfrowanego;

    for (let i = 0; i < pozostaleLitery; i++) {
      const timeout = setTimeout(() => {
        setIndexAktywnego(poczatek + i);
        setIndexZaszyfrowanego(poczatek + i + 1);

        if (i === pozostaleLitery - 1) {
          setCzySzyfrowanie(false);

          setTimeout(() => {
            setIndexAktywnego(-1);
          }, 500);
        }
      }, i * 200);

      timeoutRef.current.push(timeout);
    }
  }

  // Powrót do początku
  function odNowa() {
    if (czySzyfrowanie) return;

    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];

    setIndexZaszyfrowanego(0);
    setIndexAktywnego(-1);
  }

  // Czyszczenie zaszyfrowanego tekstu
  function wyczysc() {
    odNowa();
  }

  // Czyszczenie timeoutów po opuszczeniu aplikacji
  useEffect(() => {
    return () => {
      timeoutRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <input
        type="text"
        value={tekst}
        disabled={czySzyfrowanie}
        onChange={(e) => {
          setTekst(e.target.value.toUpperCase());
          setIndexZaszyfrowanego(0);
          setIndexAktywnego(-1);
        }}
      />

      <input
        type="range"
        min={1}
        max={alfabet.length - 1}
        value={przesuniecie}
        disabled={czySzyfrowanie}
        onChange={(e) => {
          setPrzesuniecie(Number(e.target.value));
          setIndexZaszyfrowanego(0);
          setIndexAktywnego(-1);
        }}
      />

      <p>Przesunięcie o {przesuniecie}:</p>

      <div className="okienka">
        {tekst.split("").map((znak, index) => (
          <Okienko
            key={index}
            znak={znak}
            przesuniecie={przesuniecie}
            zaszyfrowane={index < indexZaszyfrowanego}
            animowane={index === indexAktywnego}
            opoznienie={
              czySzyfrowanie
                ? Math.max(0, index - indexZaszyfrowanego) * 0.2
                : 0
            }
          />
        ))}
      </div>

      <button
        disabled={czySzyfrowanie || indexZaszyfrowanego >= tekst.length}
        onClick={szyfrujNastepnaLitere}
      >
        Zaszyfruj następną literę
      </button>

      <button
        disabled={czySzyfrowanie || indexZaszyfrowanego >= tekst.length}
        onClick={szyfrujCalosc}
      >
        Zaszyfruj całość
      </button>

      <button
        disabled={czySzyfrowanie}
        onClick={odNowa}
      >
        Od nowa
      </button>

      <button
        disabled={czySzyfrowanie}
        onClick={wyczysc}
      >
        Wyczyść zaszyfrowany tekst
      </button>

      <p>Zaszyfrowany tekst: {zaszyfrowanyTekst}</p>

      <p>
        Licznik: {indexZaszyfrowanego} / {tekst.length}
      </p>
    </>
  )
}

export default App