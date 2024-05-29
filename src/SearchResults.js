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
      [product.Descricao]: value
    });
  };

  const handleSelectProduct = (product) => {
    const quantity = parseInt(quantities[product.Descricao] || 1, 10);

    if (isNaN(quantity) || quantity <= 0) {
      alert('Por favor, insira uma quantidade válida.');
      return;
    }

    const existingProduct = selectedProducts.find(item => item.product.Descricao === product.Descricao);
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.map(item =>
          item.product.Descricao === product.Descricao
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, { product, quantity }]);
    }

    setQuantities({
      ...quantities,
      [product.Descricao]: ''
    });
  };

  const handleGenerateQuote = () => {
    const totalAmount = selectedProducts.reduce((sum, item) => {
      return sum + parseFloat(item.product.Preco.replace(',', '.')) * item.quantity;
    }, 0);

    const quoteContent = selectedProducts.map((item, index) => (
      `<div key=${index} class="quote-item">
        <p><strong>Descrição:</strong> ${item.product.Descricao}</p>
        <p><strong>Valor:</strong> R$${item.product.Preco}</p>
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
        margin: 5px;
      }
      .button-container button:hover {
        background-color: #0056b3;
      }
      .button-container .back-button {
        background-color: #28a745;
      }
      .button-container .back-button:hover {
        background-color: #218838;
      }
      .button-container .whatsapp-button {
        background-color: #25d366;
      }
      .button-container .whatsapp-button:hover {
        background-color: #128c7e;
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
    quoteWindow.document.write('<div class="button-container">');
    quoteWindow.document.write('<button onclick="window.print()">Imprimir</button>');
    quoteWindow.document.write('<button class="back-button" onclick="window.close()">Voltar</button>');
    quoteWindow.document.write('<button class="whatsapp-button" onclick="shareOnWhatsApp()">Compartilhar no WhatsApp</button>');
    quoteWindow.document.write('</div>');
    quoteWindow.document.write(`<script>
      function shareOnWhatsApp() {
        const quoteText = 'Orçamento:\\n' + 
          ${JSON.stringify(selectedProducts.map(item => `${item.product.Descricao} - R$${item.product.Preco} x ${item.quantity} unidades`))} + 
          '\\nTotal: R$${totalAmount.toFixed(2)}';
        const url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(quoteText);
        window.open(url, '_blank');
      }
    </script>`);
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
          placeholder="R$"
        />
      </div>
      <h2>RESULTADOS DA BUSCA:</h2>
      {results.map((result, index) => {
        const selectedProduct = selectedProducts.find(item => item.product.Descricao === result.Descricao);
        const selectedQuantity = selectedProduct ? selectedProduct.quantity : 0;

        return (
          <div key={index} className="search-result-item">
            <p><strong>Descrição:</strong> {result.Descricao}</p>
            <p><strong>Valor:</strong> R${result.Preco}</p>
            <p><strong>Quantidade em Estoque:</strong> {result.Quantidade}</p>
            <div>
              <label htmlFor={`quantity-${index}`}>Quantidade:</label>
              <input
                type="number"
                id={`quantity-${index}`}
                className="quantity-input"
                value={quantities[result.Descricao] || ''}
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
