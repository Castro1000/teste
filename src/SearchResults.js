import React, { useState } from 'react';
import './styles.css';

const SearchResults = ({ results }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (e, product) => {
    const { value } = e.target;
    setQuantities({
      ...quantities,
      [product.description]: value
    });
  };

  const handleSelectProduct = (product) => {
    const quantity = parseInt(quantities[product.description] || 1, 10);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Por favor, insira uma quantidade válida.');
      return;
    }
    const existingProduct = selectedProducts.find(item => item.product.description === product.description);
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.map(item =>
          item.product.description === product.description
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, { product, quantity }]);
    }
    // Reset the quantity input field
    setQuantities({
      ...quantities,
      [product.description]: 1
    });
  };

  const handleGenerateQuote = () => {
    const totalAmount = selectedProducts.reduce((sum, item) => {
      return sum + parseFloat(item.product.price.replace(',', '.')) * item.quantity;
    }, 0);

    const quoteContent = selectedProducts.map((item, index) => (
      `<div key=${index} class="quote-item">
        <p><strong>Descrição:</strong> ${item.product.description}</p>
        <p><strong>Valor:</strong> R$${item.product.price}</p>
        <p><strong>Quantidade:</strong> ${item.quantity}</p>
        <p><strong>Filial:</strong> ${item.product.branch}</p>
        <hr />
      </div>`
    )).join('');

    const quoteWindow = window.open('', '', 'width=800,height=600');
    quoteWindow.document.write('<html><head><title>Orçamento</title>');
    quoteWindow.document.write('<style>');
    quoteWindow.document.write(`
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }
      h2, h3 {
        text-align: center;
        color: #333;
      }
      .quote-item {
        background-color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
      }
      .quote-item p {
        margin: 5px 0;
      }
      .quote-item hr {
        border: 0;
        height: 1px;
        background: #ddd;
        margin: 10px 0;
      }
    `);
    quoteWindow.document.write('</style>');
    quoteWindow.document.write('</head><body>');
    quoteWindow.document.write('<div class="header"><img src="https://www.sistemasmais.net/pneuforte.png?v=3be4g022c5xjr7" alt="Banner" /></div>');
    quoteWindow.document.write('<h2>Folha de Orçamento</h2>');
    quoteWindow.document.write(quoteContent);
    quoteWindow.document.write(`<h3>Total: R$${totalAmount.toFixed(2).replace('.', ',')}</h3>`);
    quoteWindow.document.write('</body></html>');
    quoteWindow.document.close();
    quoteWindow.print();
  };

  return (
    <div className="search-results">
      <h2>RESULTADOS DA BUSCA:</h2>
      <p>Produtos Selecionados: {selectedProducts.reduce((total, item) => total + item.quantity, 0)}</p>
      {results.map((result, index) => (
        <div key={index} className="search-result-item">
          <p><strong>Descrição:</strong> {result.description}</p>
          <p><strong>Valor:</strong> R${result.price}</p>
          <p><strong>Quantidade em Estoque:</strong> {result.quantity}</p>
          <p><strong>Filial:</strong> {result.branch}</p>
          <input
            type="number"
            min="1"
            value={quantities[result.description] || ''}
            onChange={(e) => handleQuantityChange(e, result)}
            className="quantity-input"
          />
          <button onClick={() => handleSelectProduct(result)}>Selecionar Produto</button>
          <hr />
        </div>
      ))}
      {selectedProducts.length > 0 && (
        <button onClick={handleGenerateQuote} className="generate-quote-button">Gerar Folha de Orçamento</button>
      )}
    </div>
  );
};

export default SearchResults;
