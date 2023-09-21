import React, { useEffect, useState } from 'react';

function PokemonDetails({ pokemonName, onClose }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
      });
  }, [pokemonName]);

  return (
    <div className="pokemon-details">
      <h2>{pokemonData ? pokemonData.name : 'Loading...'}</h2>
      {pokemonData && (
        <div>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="pokemon-image"
          />
          <p>CP: {pokemonData.base_experience}</p>
          <p>Attack: {getStatValue(pokemonData, 'attack')}</p>
          <p>Defense: {getStatValue(pokemonData, 'defense')}</p>
          <p>HP: {getStatValue(pokemonData, 'hp')}</p>
          <p>Speed: {getStatValue(pokemonData, 'speed')}</p>
          <p>Height: {pokemonData.height / 10} m</p>
          <p>Weight: {pokemonData.weight / 10} kg</p>
          <p>Abilities: {getAbilities(pokemonData)}</p>
          <p>Species: {pokemonData.species.name}</p>
          {/* Add more details as needed */}
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

function getStatValue(pokemonData, statName) {
  const stat = pokemonData.stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : 'N/A';
}

function getAbilities(pokemonData) {
  return pokemonData.abilities.map((ability) => ability.ability.name).join(', ');
}

export default PokemonDetails;
