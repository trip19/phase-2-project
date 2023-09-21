import React, { useState } from 'react';
import PokemonDetails from './PokemonDetails';

function PokemonList({ pokemonData, currentPage, pokemonsPerPage, searchTerm }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const filteredPokemonData = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentPokemons = filteredPokemonData.slice(startIndex, startIndex + pokemonsPerPage);

  const handleCardClick = (pokemonName) => {
    const selected = currentPokemons.find((pokemon) => pokemon.name === pokemonName);
    setSelectedPokemon(selected);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="pokemon-grid">
      {currentPokemons.map((pokemon, index) => (
        <div
          className="pokemon-card"
          key={index}
          onClick={() => handleCardClick(pokemon.name)}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              startIndex + index + 1
            }.png`}
            alt={pokemon.name}
          />
          <span id="name">{pokemon.name}</span>
          {/* Add other details like CP, attack, defense, type here */}
        </div>
      ))}

      {selectedPokemon && (
        <div className="overlay">
          <PokemonDetails pokemonName={selectedPokemon.name} onClose={handleCloseDetails} />
        </div>
      )}
    </div>
  );
}

export default PokemonList;
