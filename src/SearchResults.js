import React, { useState } from 'react';
import './styles.css';

const SearchResults = ({ results }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [dollarRate, setDollarRate] = useState('');

  const handleDollarRateChange = (e) => {
    setDollarRate(e.target.value);
  };

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
      [product.description]: ''
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
      .button-container {
        text-align: center;
        margin-top: 20px;
      }
      .button-container button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .button-container button:hover {
        background-color: #0056b3;
      }
    `);
    quoteWindow.document.write('</style>');
    quoteWindow.document.write('</head><body>');
    quoteWindow.document.write('<div class="header"><img src="banner-image-url.jpg" alt="Banner" /></div>');
    quoteWindow.document.write('<h2>Orçamento</h2>');
    quoteWindow.document.write(quoteContent);
    quoteWindow.document.write(`<h3>Total: R$${totalAmount.toFixed(2)}</h3>`);
    if (dollarRate) {
      const totalDollar = (totalAmount / parseFloat(dollarRate)).toFixed(2);
      quoteWindow.document.write(`<h3>Total em Dólar: $${totalDollar}</h3>`);
    }
    quoteWindow.document.write('<div class="button-container"><button onclick="window.print()">Imprimir</button></div>');
    quoteWindow.document.write('</body></html>');
    quoteWindow.document.close();
  };

  return (
    <div className="search-results">
      <div className="dollar-rate">
        <label htmlFor="dollarRate">Cotação do Dólar:</label>
        <input
          type="number"
          id="dollarRate"
          value={dollarRate}
          onChange={handleDollarRateChange}
          placeholder="Ex: 5.25"
        />
      </div>
      <h2>RESULTADOS DA BUSCA:</h2>
      {results.map((result, index) => {
        const selectedProduct = selectedProducts.find(item => item.product.description === result.description);
        const selectedQuantity = selectedProduct ? selectedProduct.quantity : 0;

        return (
          <div key={index} className="search-result-item">
            <p><strong>Descrição:</strong> {result.description}</p>
            <p><strong>Valor:</strong> R${result.price}</p>
            <p><strong>Quantidade em Estoque:</strong> {result.quantity}</p>
            <p><strong>Filial:</strong> {result.branch}</p>
            <div>
              <label htmlFor={`quantity-${index}`}>Quantidade:</label>
              <input
                type="number"
                id={`quantity-${index}`}
                className="quantity-input"
                value={quantities[result.description] || ''}
                onChange={(e) => handleQuantityChange(e, result)}
                min="1"
              />
              <button onClick={() => handleSelectProduct(result)}>Adicionar ao Orçamento</button>
              {selectedQuantity > 0 && (
                <span className="added-quantity"> Adicionado: {selectedQuantity}</span>
              )}
            </div>
            <hr />
          </div>
        );
      })}
      {selectedProducts.length > 0 && (
        <button className="generate-quote-button" onClick={handleGenerateQuote}>
          Gerar Orçamento
        </button>
      )}
    </div>
  );
};

export default SearchResults;
