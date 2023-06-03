import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes } from '../../redux/slices/heroesSlice';
import { Collection } from '..';
import '@testing-library/jest-dom';

// Replace modules with empty object which contains mock functions only
// Mocking the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mocking the fetchHeroes func
jest.mock('../../redux/slices/heroesSlice', () => ({
  fetchHeroes: jest.fn()
}));

describe('Collection component', () => {
  let mockDispatch

  // Redefine neccessary functions to particular values before each test
  beforeEach(() => {
    mockDispatch = jest.fn()
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({ heroes: { status: 'loading', items: [] } });
  });

  // Clear functions after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    render(<Collection />);
    expect(screen.getByTestId('collection-component')).toBeInTheDocument();
  });

  it('dispatches fetchHeroes action on mount', async () => {
    render(<Collection />);

    // Check if our dispatch called certain number of times with argument: fetchHeroes(currentPage) 
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith(fetchHeroes(1));
  });

  it('displays loading message when status is "loading"', () => {
    // Imitate Redux useSelector to define custom values to state
    useSelector.mockReturnValue({ heroes: { status: 'loading', items: [] } });

    render(<Collection />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays hero cards when status is not "loading"', () => {
    // Custom heroes to come
    const mockHeroes = [
      { _id: 1, name: 'Hero 1', images: ['image1.jpg'], nickname: 'Nickname 1' },
      { _id: 2, name: 'Hero 2', images: ['image2.jpg'], nickname: 'Nickname 2' },
    ];

    // Imitate Redux useSelector to define custom values to state
    useSelector.mockReturnValue({ heroes: { status: 'loaded', items: mockHeroes } });

    render(<Collection />);

    expect(screen.getByTestId('hero-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('hero-card-2')).toBeInTheDocument();
  });
});
