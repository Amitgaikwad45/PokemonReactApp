// src/components/PokemonList/PokemonDetailsModal.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { PokemonDetailsModal, POKEMON_QUERY } from './PokemonDetailsModal';

const mockPokemon = {
  id: '001',
  number: '001',
  name: 'Bulbasaur',
  weight: { minimum: '6.04 kg', maximum: '7.07 kg' },
  height: { minimum: '0.61 m', maximum: '0.71 m' },
  classification: 'Seed Pokémon',
  types: ['Grass', 'Poison'],
  weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
  fleeRate: 0.1,
  maxCP: 951,
  maxHP: 1071,
  image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
};

const mocks = [
  {
    request: { query: POKEMON_QUERY, variables: { id: '001' } },
    result: { data: { pokemon: mockPokemon } },
  },
];

describe('PokemonDetailsModal', () => {
  it('renders the Pokémon details when data is loaded', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <PokemonDetailsModal />
        </BrowserRouter>
      </MockedProvider>
    );

    // Expect a loading indicator initially
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for data to load
    const name = await screen.findByText('Bulbasaur');
    expect(name).toBeInTheDocument();
    expect(screen.getByText('Number: 001')).toBeInTheDocument();
    expect(screen.getByText('Classification: Seed Pokémon')).toBeInTheDocument();
  });
});
