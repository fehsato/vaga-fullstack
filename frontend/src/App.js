import React, { useState } from 'react';
import './App.css';

function ButtonSearch({ onClick }) {
  return (
    <button onClick={onClick}>
      Buscar
    </button>
  );
}

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite aqui..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ButtonSearch onClick={handleSearch} />
    </div>
  );
}

function MyApp() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    console.log('Search Term:', searchTerm);
  
    try {
      // Fazendo uma solicitação para o backend
      const response = await fetch(`http://localhost:8080/leites${searchTerm ? `?termo=${searchTerm}` : ''}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Resultado da busca:', data);
  
        // Atualiza o estado com os resultados da busca
        setSearchResults(data);
        console.log('searchResults:', searchResults);
      } else {
        const errorMessage = await response.text();
        console.error('Erro na solicitação:', response.status, errorMessage);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error.message);
    }
  };
  
  

  return (
    <div>
      <h1>Catálogo de Leite</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Renderiza os resultados da busca */}
      <ul>
        {searchResults.map((leite) => (
          <li key={leite.id}>{leite.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyApp;