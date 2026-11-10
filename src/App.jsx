import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function szyfruj(znak){
  const przesuniecie = 3;
  const pozycja = alfabet.indexOf(znak);

  if (pozycja === -1) {
    return znak; // Znak nie znajduje się w alfabecie, zwracamy go bez zmian
  }

  const wynik = (pozycja + przesuniecie) % alfabet.length;

  return alfabet[wynik];
}
return <>
      {szyfruj("A")}
</>
 
}

export default App
