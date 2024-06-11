import React from 'react';
import './Promotions.css';

const Promotions = () => {
  const promotions = [
    {
      image: 'url_da_imagem_1',
      description: 'Pneu X - Aro 15',
      originalPrice: '300.00',
      promotionalPrice: '250.00',
    },
    {
      image: 'url_da_imagem_2',
      description: 'Pneu Y - Aro 16',
      originalPrice: '350.00',
      promotionalPrice: '280.00',
    },
    // Adicione mais promoções conforme necessário
  ];

  return (
    <div className="promotions">
      <header className="promotions-header">
        <h1>Promoções de Pneus</h1>
      </header>
      <div className="promotions-list">
        {promotions.map((promotion, index) => (
          <div key={index} className="promotion-item">
            <img src={promotion.image} alt={promotion.description} className="promotion-image" />
            <div className="promotion-info">
              <h2>{promotion.description}</h2>
              <p>
                Preço Original: 
                {Number(promotion.originalPrice).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p>
                Preço Promocional: 
                {Number(promotion.promotionalPrice).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
