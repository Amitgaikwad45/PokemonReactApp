import { useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { Link, useParams } from 'react-router-dom';
import { PokemonDetailsModal } from '../PokemonList/PokemonDetailsModal';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading, error: fetchError } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const { id } = useParams();

  const handleChange = (e) => {
    try {
      const value = e.target.value.trim(); // Trim the input value
      setSearchTerm(value);
      setError(null); // Reset the error state if previously set
    } catch (err) {
      setError('An error occurred while processing your input.'); // Set error if needed
    }
  };

  // Use useMemo to memoize the filtered list of Pokémon
  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pkmn) =>
      pkmn.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  return (
    <div className={classes.root}>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleChange} // Use handleChange function
        className={classes.searchInput}
      />
      {error && <div className={classes.error}>{error}</div>}
      {fetchError && <div className={classes.error}>Failed to load Pokémon data.</div>}
      {loading && <div>Loading...</div>}
      {!loading && !error && filteredPokemons.length === 0 && (
        <div>No Pokémon found for "{searchTerm}"</div>
      )}
      <div className={classes.pokemonGrid}>
        {filteredPokemons.map((pkmn) => (
          <Link to={`/pokemon/${pkmn.id}`} key={pkmn.id} className={classes.pokemonLink}>
            <div className={classes.pokemonItem}>
              <img src={pkmn.image} alt={pkmn.name} className={classes.pokemonImage} />
              <div>{pkmn.name}</div>
              <div>Number: {pkmn.number}</div>
              <div>Types: {pkmn.types.join(', ')}</div>
            </div>
          </Link>
        ))}
      </div>
      {id && <PokemonDetailsModal />}
    </div>
  );
};

const useStyles = createUseStyles({
  root: {
    width: '100%',
    textAlign: 'center',
    padding: '32px',
    boxSizing: 'border-box',
  },
  searchInput: {
    padding: '8px',
    width: '80%',
    marginBottom: '16px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    color: '#333',
    backgroundColor: '#fff',
    '&:focus': {
      outline: 'none',
      borderColor: '#aaa',
    },
  },
  pokemonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  pokemonLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  pokemonItem: {
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: '#f1f1f1',
    },
  },
  pokemonImage: {
    width: '100px',
    height: '100px',
    marginBottom: '8px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    margin: '16px 0',
  },
});
