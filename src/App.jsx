import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function szyfruj(znak, przesuniecie){
  const pozycja = alfabet.indexOf(znak);
  if (pozycja === -1) {
    return znak; 
  }

  const wynik = (pozycja + przesuniecie) % alfabet.length;

  return alfabet[wynik];
}

function App() {
  const [tekst, setTekst] = useState("PIEROGI");
  const [przesuniecie, setPrzesuniecie] = useState(3);

  const zaszyfrowanyTekst = tekst.split("").map((znak) => szyfruj(znak, przesuniecie)).join("");
  
return <>
      <input type="text" value={tekst}
        onChange={ (e) => setTekst(e.target.value) }
      />
      <input type="range" min={1} max={25} value={przesuniecie}
        onChange={ (e) => setPrzesuniecie(e.target.value) }/>

        <p>{zaszyfrowanyTekst}</p>
</>
}
 


export default App
