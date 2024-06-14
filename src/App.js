import React, { useState } from 'react';
import SearchResults from './SearchResults';
import './styles.css';

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [dollarRate, setDollarRate] = useState(1);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://buscadepneus.vercel.app/api/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Erro na solicitação de busca');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleAddToCart = (product, quantity) => {
    setCart([...cart, { ...product, quantity: parseInt(quantity) }]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.Preco * item.quantity;
    }, 0);
  };

  const handleGenerateQuote = () => {
    const quoteData = JSON.stringify(cart);
    localStorage.setItem('quoteData', quoteData);
    window.location.href = '/quote'; // Verifique se essa rota existe no seu aplicativo
  };

  return (
    <div className="app">
      <header className="header">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTGihoZ-eh698DsTk13pKlSbjKN8DS67L8HoIyrFNJg&s"
          alt="Banner da Busca"
          className="search-banner"
        />
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Pesquisar</button>
        </div>
        <div className="dollar-rate">
          <label>
            Taxa Dólar:
            <input
              type="number"
              step="0.01"
              value={dollarRate}
              onChange={(e) => setDollarRate(parseFloat(e.target.value))}
            />
          </label>
        </div>
      </header>
      <SearchResults results={results} onAddToCart={handleAddToCart} cart={cart} dollarRate={dollarRate} />
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>
            Total: 
            {Number(calculateTotal()).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
          <button onClick={handleGenerateQuote} className="generate-quote-button">
            Gerar Orçamento
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
