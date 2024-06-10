import React, { useState } from 'react';
import SearchResults from './SearchResults';
import './styles.css';



const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
<<<<<<< HEAD
  const [showQuote, setShowQuote] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3306/api/search?q=${query}`); // Adicionado http://
=======

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?q=${query}`);
>>>>>>> 7dbab8be13678b125d581b33f493b53c8cf9e35c
      if (!response.ok) {
        throw new Error('Erro na solicitação de busca');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

<<<<<<< HEAD
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

=======
  const handleAddToCart = (product, quantity) => {
    setCart([...cart, { ...product, quantity: parseInt(quantity) }]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.Preco * item.quantity, 0);
  };

  const handleGenerateQuote = () => {
    const quoteData = JSON.stringify(cart);
    localStorage.setItem('quoteData', quoteData);
    window.location.href = '/quote';
  };

>>>>>>> 7dbab8be13678b125d581b33f493b53c8cf9e35c
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
      </header>
<<<<<<< HEAD
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
=======
      <SearchResults results={results} onAddToCart={handleAddToCart} cart={cart} />
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
>>>>>>> 7dbab8be13678b125d581b33f493b53c8cf9e35c
        </div>
      )}
    </div>
  );
};

export default App;
