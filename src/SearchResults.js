// SearchResults.js

import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.Descricao}</td>
                <td>
                  {Number(result.Preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4,
                  })}
                </td>
                <td>{result.Quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default SearchResults;
