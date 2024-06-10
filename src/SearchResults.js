import React, { useState } from 'react';

<<<<<<< HEAD
=======
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

<<<<<<< HEAD
>>>>>>> fa810b7918aae969b0f3937a31412144af4d4369
const SearchResults = ({ results, addToCart }) => {
  return (
    <div className="search-results">
      <h2>RESULTADOS DA PESQUISA:</h2>
      {results.map((result, index) => (
        <div key={index} className="search-result-item">
          <p><strong>Descrição:</strong> {result.Descricao}</p>
          <p><strong>Preço:</strong> R${result.Preco}</p>
          <p><strong>Quantidade em Estoque:</strong> {result.Quantidade}</p>
          <button onClick={() => addToCart(result)}>Adicionar ao Carrinho</button>
          <hr />
        </div>
      ))}
=======
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
>>>>>>> 7dbab8be13678b125d581b33f493b53c8cf9e35c
    </div>
  );
};

export default SearchResults;