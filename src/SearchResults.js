import React from 'react';
import './styles.css';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      <h2>RESULTADOS DA PESQUISA:</h2>
      {results.map((result, index) => (
        <div key={index} className="search-result-item">
          <p><strong>Descrição:</strong> {result.Descricao}</p>
          <p><strong>Preço:</strong> R${result.Preco}</p>
          <p><strong>Quantidade em Estoque:</strong> {result.Quantidade}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
