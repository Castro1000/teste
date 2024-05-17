import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      <h2>RESULTADOS  BUSCA:</h2>
      {results.map((result, index) => (
        <div key={index} className="search-result-item">
          <p><strong>Descrição:</strong> {result.description}</p>
          <p><strong>Valor:</strong> R${result.price}</p>
          <p><strong>Quantidade em Estoque:</strong> {result.quantity}</p>
          <p><strong>Filial:</strong> {result.branch}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
