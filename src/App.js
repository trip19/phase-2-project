import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const pokemonsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      setPokemonData(data.results);
      setTotalPages(Math.ceil(data.results.length / pokemonsPerPage));
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  return (
    <div className="App">
      <h1>Pokemon Search App</h1>
      <SearchBar onSearch={handleSearch} />
      <PokemonList
        pokemonData={pokemonData}
        currentPage={currentPage}
        pokemonsPerPage={pokemonsPerPage}
        searchTerm={searchTerm}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
}

export default App;
