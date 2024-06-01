import React, { useState } from 'react';

const SearchResults = ({ results, onAddToCart, cart }) => {
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
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Adicionar</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className={isInCart(result) ? 'in-cart' : ''}>
                <td>{result.Descricao}</td>
                <td>
                  {Number(result.Preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4,
                  })}
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="9999" // Limitar a quantidade máxima para 4 dígitos
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
