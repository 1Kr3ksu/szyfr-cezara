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

  const PozycjaPoPrzesunieciu = pozycja +przesuniecie;

  return alfabet[PozycjaPoPrzesunieciu];
}
}

export default App
