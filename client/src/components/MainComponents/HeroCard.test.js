import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteHero, fetchHeroes } from '../../redux/slices/heroesSlice';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ModalDelete, HeroCard } from '..';
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('HeroCard', () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders hero card with correct data', () => {
    const hero = {
      _id: '1',
      nickname: 'Superhero',
      images: ['image.jpg'],
    };

    render(<HeroCard hero={hero} />);

    // check renders
    expect(screen.getByText('Superhero')).toBeInTheDocument();
    expect(screen.getByAltText('Hero')).toBeInTheDocument();
    expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });

  it('navigates to edit page when edit button is clicked', () => {
    const hero = {
      _id: '1',
      nickname: 'Superhero',
      images: ['image.jpg'],
    };

    render(<HeroCard hero={hero} />);

    const editButton = screen.getByTestId('edit-button');

    // fire onClick event
    fireEvent.click(editButton);

    // check navigation to navigate
    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith(`/edit/${hero._id}`);
  });

  it('opens modal when delete button is clicked', () => {
    const hero = {
      _id: '1',
      nickname: 'Superhero',
      images: ['image.jpg'],
    };

    render(<HeroCard hero={hero} />);

    const deleteButton = screen.getByTestId('delete-button');

    // fire onClick event
    fireEvent.click(deleteButton);

    const modal = screen.getByTestId('modal-delete');

    // check if deleteModal appears in DOM
    expect(modal).toBeInTheDocument();
  });

  it('calls deleteHero and fetchHeroes when handleDelete is called', () => {
    const hero = {
      _id: '1',
      nickname: 'Superhero',
      images: ['image.jpg'],
    };

    render(<HeroCard hero={hero} />);

    // open modal
    fireEvent.click(screen.getByTestId('delete-button'));

    // delete hero from deleteModal button
    fireEvent.click(screen.getByTestId('modal-delete-button'));

    // check to call delete Dispatch twice (deleteHero and fetchHeroes)
    expect(mockDispatch).toBeCalledTimes(2);
  });
});
