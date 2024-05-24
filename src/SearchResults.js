import React, { useState } from 'react';
import './styles.css';

const SearchResults = ({ results }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const handleGenerateQuote = () => {
    const totalAmount = selectedProducts.reduce((sum, product) => {
      return sum + parseFloat(product.price.replace(',', '.'));
    }, 0);

    const quoteContent = selectedProducts.map((product, index) => (
      `<div key=${index} class="quote-item">
        <p><strong>Descrição:</strong> ${product.description}</p>
        <p><strong>Valor:</strong> R$${product.price}</p>
        <p><strong>Quantidade em Estoque:</strong> ${product.quantity}</p>
        <p><strong>Filial:</strong> ${product.branch}</p>
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
      {results.map((result, index) => (
        <div key={index} className="search-result-item">
          <p><strong>Descrição:</strong> {result.description}</p>
          <p><strong>Valor:</strong> R${result.price}</p>
          <p><strong>Quantidade em Estoque:</strong> {result.quantity}</p>
          <p><strong>Filial:</strong> {result.branch}</p>
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
