import React from 'react';
import SearchResults from './SearchResults';
import './styles.css';

const App = () => {
  const results = [
    {
      description: "175/60R15 H/T 81H SPLM704 DUNL",
      price: "253,00",
      quantity: 10,
      branch: "Filial 1",
      image: "https://example.com/imagem1.jpg"
    },
    {
      description: "185/35R17 H/T 82V SPORT+2 XLOAD XBRI",
      price: "261,00",
      quantity: 5,
      branch: "Filial 10",
      image: "https://example.com/imagem2.jpg"
    },
    // mais resultados...
  ];

  return (
    <div className="app">
      <header>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjU1zG1G7_CCe55bDZDWPoRr_-OluX5WXFMcAeGTjb5Q&s" alt="Banner da Busca" className="search-banner" />
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
