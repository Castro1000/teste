import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/search?q=${query}`);
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
}

export default App;
