import React, { useState } from 'react';
import SearchResults from './SearchResults';
import './styles.css';

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showQuote, setShowQuote] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3306/api/search?q=${query}`); // Adicionado http://
      if (!response.ok) {
        throw new Error('Erro na solicitação de busca');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
  };

  const handleSaveQuote = () => {
    setShowQuote(true);
  };

  const totalAmount = cart.reduce((total, item) => {
    const itemTotal = typeof item.Preco === 'number' ? item.Preco * item.quantity : 0;
    return total + itemTotal;
  }, 0);

  if (showQuote) {
    return (
      <div className="quote">
        <h2>Orçamento</h2>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço Unitário (R$)</th>
              <th>Total (R$)</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.Descricao || 'Sem Nome'}</td>
                <td>{item.quantity}</td>
                <td>{item.Preco !== undefined ? item.Preco.toFixed(2) : 'N/A'}</td>
                <td>{item.Preco !== undefined ? (item.Preco * item.quantity).toFixed(2) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total</td>
              <td>{totalAmount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <button className="back-button" onClick={() => setShowQuote(false)}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTGihoZ-eh698DsTk13pKlSbjKN8DS67L8HoIyrFNJg&s" alt="Banner da Busca" className="search-banner" />
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Pesquisar</button>
        </div>
      </header>
      <SearchResults results={results} addToCart={addToCart} />
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Resumo do Carrinho</h3>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário (R$)</th>
                <th>Total (R$)</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.Descricao || 'Sem Nome'}</td>
                  <td>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td>{item.Preco !== undefined ? item.Preco.toFixed(2) : 'N/A'}</td>
                  <td>{item.Preco !== undefined ? (item.Preco * item.quantity).toFixed(2) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total</td>
                <td>{totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <button className="generate-quote-button" onClick={handleSaveQuote}>Salvar Orçamento</button>
        </div>
      )}
    </div>
  );
};

export default App;
