import './App.css';
import { useState } from 'react';


function ButtonSearch() {
  function handleClick() {
    alert('O botão está funcionando');
  }

  return (
    <button onClick={handleClick}>
      Buscar
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Catálogo de Leite</h1>
      <ButtonSearch />
    </div>
  );
}
