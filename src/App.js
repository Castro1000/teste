import React from 'react';
import SearchResults from './SearchResults';
import './styles.css';

const App = () => {
  const results = [
    {
      description: "Produto 1",
      price: "100,00",
      quantity: 10,
      branch: "Filial A",
      image: "https://example.com/imagem1.jpg"
    },
    {
      description: "Produto 2",
      price: "200,00",
      quantity: 5,
      branch: "Filial B",
      image: "https://example.com/imagem2.jpg"
    },
    // mais resultados...
  ];

  return (
    <div className="app">
      <header>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYqzRhmwR2lWrfgPJzYghPiDqJA5NRk1d8PGpyCIAKTQ&s" alt="IMAGEM" className="search-banner" />
        <SearchBar />
      </header>
      <SearchResults results={results} />
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Buscar..." />
      <button>Pesquisar</button>
    </div>
  );
};

export default App;
