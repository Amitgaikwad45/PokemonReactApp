import React from 'react';
import { Dialog, DialogTitle, DialogContent, CircularProgress, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const POKEMON_QUERY = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const PokemonDetailsModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(POKEMON_QUERY, {
    variables: { id },
    skip: !id,
  });

  const handleClose = () => {
    navigate('/pokemon'); // Navigate back to the main list route on close
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error loading Pokémon details</div>;

  const { pokemon } = data || {};
  if (!pokemon) return null;

  return (
    <Dialog open={Boolean(id)} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{pokemon.name}</DialogTitle>
      <DialogContent>
        <img src={pokemon.image} alt={pokemon.name} width="150" />
        <Typography variant="body2">Number: {pokemon.number}</Typography>
        <Typography variant="body2">Classification: {pokemon.classification}</Typography>
        <Typography variant="body2">Types: {pokemon.types.join(', ')}</Typography>
        <Typography variant="body2">Weaknesses: {pokemon.weaknesses.join(', ')}</Typography>
        <Typography variant="body2">Max HP: {pokemon.maxHP}</Typography>
        <Typography variant="body2">Max CP: {pokemon.maxCP}</Typography>
        <Typography variant="body2">Flee Rate: {pokemon.fleeRate}</Typography>
        <Typography variant="body2">Height: {pokemon.height.minimum} - {pokemon.height.maximum}</Typography>
        <Typography variant="body2">Weight: {pokemon.weight.minimum} - {pokemon.weight.maximum}</Typography>
      </DialogContent>
    </Dialog>
  );
};