import React, { useState } from 'react';

const SearchResults = ({ results, onAddToCart, cart, dollarRate }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (index, value) => {
    setQuantities({
      ...quantities,
      [index]: value,
    });
  };

  const isInCart = (product) => {
    return cart.some(item => item.Descricao === product.Descricao);
  };

  return (
    <div className="search-results">
      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Código Vector</th>
              <th>NCM</th>
              <th>Preço (R$)</th>
              <th>Estoque</th>
              <th>Quantidade</th>
              <th>Adicionar</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className={isInCart(result) ? 'in-cart' : ''}>
                <td>{result.Descricao}</td>
                <td>{result.Cod_vector}</td>
                <td>{result.Ncm}</td>
                
                <td>
                  {Number(result.Preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>{result.Quantidade}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="9999"
                    value={quantities[index] || ''}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="quantity-input"
                  />
                </td>
                <td>
                  <button
                    onClick={() => onAddToCart(result, quantities[index] || 1)}
                    className="add-button"
                    disabled={isInCart(result)}
                  >
                    {isInCart(result) ? 'Adicionado' : 'Adicionar'}
                  </button>
                </td>
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
