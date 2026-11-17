
import { useState } from 'react'
import './App.css'

const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function szyfruj(znak, przesuniecie) {
  const pozycja = alfabet.indexOf(znak);

  if (pozycja === -1) {
    return znak;
  }

  const wynik = (pozycja + przesuniecie) % alfabet.length;

  return alfabet[wynik];
}

// Komponent pojedynczego okienka
function Okienko({ znak, przesuniecie, zaszyfrowane }) {
  const pozycja = alfabet.indexOf(znak);

  if (pozycja === -1) {
    return <div className="okienko">{znak}</div>;
  }

  const pozycjaPoPrzesunieciu =
    pozycja + (zaszyfrowane ? przesuniecie : 0);

  return (
    <div className={`okienko ${zaszyfrowane ? 'zaszyfrowane' : ''}`}>
      <div
        className="pasekLiter"
        style={{
          transform: `translateY(-${pozycjaPoPrzesunieciu * 40}px)`
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

  const zaszyfrowanyTekst = tekst
    .split("")
    .slice(0, indexZaszyfrowanego)
    .map((znak) => szyfruj(znak, przesuniecie))
    .join("");

  function szyfrujCalosc() {
    setIndexZaszyfrowanego(tekst.length);
  }

  function szyfrujNastepnaLitere() {
    if (indexZaszyfrowanego < tekst.length) {
      setIndexZaszyfrowanego(indexZaszyfrowanego + 1);
    }
  }

  function wyczysc() {
    setIndexZaszyfrowanego(0);
  }

  return (
    <>
      <input
        type="text"
        value={tekst}
        onChange={(e) => {
          setTekst(e.target.value);
          setIndexZaszyfrowanego(0);
        }}
      />

      <input
        type="range"
        min={1}
        max={25}
        value={przesuniecie}
        onChange={(e) => {
          setPrzesuniecie(Number(e.target.value));
          setIndexZaszyfrowanego(0);
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
          />
        ))}
      </div>

      <button onClick={szyfrujNastepnaLitere}>
        Zaszyfruj następną literę
      </button>

      <button onClick={szyfrujCalosc}>
        Zaszyfruj całość
      </button>

      <button onClick={wyczysc}>
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
