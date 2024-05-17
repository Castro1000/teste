import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Aqui está o problema
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
