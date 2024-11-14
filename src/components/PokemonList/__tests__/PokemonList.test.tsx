// src/components/PokemonList/PokemonList.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { PokemonList } from './PokemonList';
import { useGetPokemons } from '../../hooks/useGetPokemons';

// Mock the useGetPokemons hook
jest.mock('../../hooks/useGetPokemons');

const mockPokemons = [
  { id: '001', name: 'Bulbasaur', number: '001', types: ['Grass', 'Poison'], image: 'bulbasaur.png' },
  { id: '002', name: 'Ivysaur', number: '002', types: ['Grass', 'Poison'], image: 'ivysaur.png' },
  { id: '003', name: 'Venusaur', number: '003', types: ['Grass', 'Poison'], image: 'venusaur.png' },
];

describe('PokemonList Component', () => {
  beforeEach(() => {
    // Mock the hook to return test data
    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons: mockPokemons,
      loading: false,
    });
  });

  it('renders search input and Pokémon list', () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </MockedProvider>
    );

    // Check if search input is rendered
    expect(screen.getByPlaceholderText(/Search Pokémon.../i)).toBeInTheDocument();

    // Check if Pokémon items are rendered
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
    expect(screen.getByText('Venusaur')).toBeInTheDocument();
  });

  it('displays loading message when loading', () => {
    (useGetPokemons as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: true,
    });

    render(
      <MockedProvider>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </MockedProvider>
    );

    // Check if loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays "No Pokémon found" when search yields no results', () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </MockedProvider>
    );

    const searchInput = screen.getByPlaceholderText(/Search Pokémon.../i);

    // Type a search term that yields no results
    fireEvent.change(searchInput, { target: { value: 'Charmander' } });

    // Check if no Pokémon message is displayed
    expect(screen.getByText(/No Pokémon found for "Charmander"/i)).toBeInTheDocument();
  });

  it('filters Pokémon list based on search term', () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </MockedProvider>
    );

    const searchInput = screen.getByPlaceholderText(/Search Pokémon.../i);

    // Type "Ivy" in search input
    fireEvent.change(searchInput, { target: { value: 'Ivy' } });

    // Check if filtered Pokémon is displayed
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
    expect(screen.queryByText('Venusaur')).not.toBeInTheDocument();
  });

  it('navigates to Pokémon details modal when a Pokémon is clicked', async () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </MockedProvider>
    );

    const bulbasaurLink = screen.getByText('Bulbasaur').closest('a');
    fireEvent.click(bulbasaurLink);

    // Wait for modal component to render
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
  });
});
