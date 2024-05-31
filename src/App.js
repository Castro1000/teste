// App.js (Frontend)

import React, { useState } from 'react';
import SearchResults from './SearchResults';
import './styles.css';

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3306/api/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Erro na solicitação de busca');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTGihoZ-eh698DsTk13pKlSbjKN8DS67L8HoIyrFNJg&s" alt="Banner da Busca" className="search-banner" />
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Pesquisar</button>
        </div>
      </header>
      <SearchResults results={results} />
    </div>
  );
};

export default App;
