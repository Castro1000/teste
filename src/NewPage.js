import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { Link } from 'react-router-dom';

const NewPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [dollarRate, setDollarRate] = useState(0);

  useEffect(() => {
    const fetchDollarRate = async () => {
      try {
        const response = await axios.get('/api/dollarRate');
        setDollarRate(response.data.rate);
      } catch (error) {
        console.error('Erro ao buscar a taxa do dólar:', error);
      }
    };

    fetchDollarRate();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/search', { params: { query } });
      setResults(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const addToCart = (product) => {
    setResults(results.map((result) =>
      result.id === product.id ? { ...result, inCart: true } : result
    ));
  };

  return (
    <div className="app">
      <header>
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
          />
          <button onClick={handleSearch}>Pesquisar</button>
        </div>
        <div className="dollar-rate">
          <label>Taxa do Dólar: {dollarRate.toFixed(2)}</label>
        </div>
        <Link to="/promotions" className="promotions-button">Ver Promoções de Pneus</Link>
      </header>
      <div className="search-results">
        {results.map((result) => (
          <div key={result.id} className={`search-result-item ${result.inCart ? 'in-cart' : ''}`}>
            <h2>{result.name}</h2>
            <p>Preço: {result.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            {!result.inCart && <button onClick={() => addToCart(result)}>Adicionar ao Orçamento</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewPage;
