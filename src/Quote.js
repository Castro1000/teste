import React, { useEffect, useState } from 'react';
import './styles.css';

const Quote = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const quoteData = localStorage.getItem('quoteData');
    if (quoteData) {
      setCart(JSON.parse(quoteData));
    }
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.Preco * item.quantity;
    }, 0);
  };

  return (
    <div className="quote">
      <h2>Orçamento</h2>
      {cart.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.Descricao}</td>
                <td>
                  {Number(item.Preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4,
                  })}
                </td>
                <td>{item.quantity}</td>
                <td>
                  {Number(item.Preco * item.quantity).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum item no orçamento.</p>
      )}
      <h3>
        Total: 
        {Number(calculateTotal()).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })}
      </h3>
      <div className="quote-actions">
        <button onClick={() => window.print()} className="print-button">Imprimir</button>
        <button onClick={() => window.history.back()} className="back-button">Voltar</button>
      </div>
    </div>
  );
};

export default Quote;
