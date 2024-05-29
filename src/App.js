import React from 'react';
import SearchResults from './SearchResults';
import './styles.css';

const App = () => {
  const results = [
    {
      Descricao: "",
      Preco: "",
      Quantidade: 10,
      Cod_marca: "",
    },
    // mais resultados...
  ];

  return (
    <div className="app">
      <header>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTGihoZ-eh698DsTk13pKlSbjKN8DS67L8HoIyrFNJg&s" alt="Banner da Busca" className="search-banner" />
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
