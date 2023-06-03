import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { useDispatch } from 'react-redux';
import { createHero, updateHero } from '../../redux/slices/heroesSlice';

import { FormComponent } from '..';
import { useNavigate } from 'react-router-dom';

import { handleUploadImagesCreate, handleUploadImagesEdit } from '../../utils/uploadUtils';

import '@testing-library/jest-dom';

// Redefine modules with custom object
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

jest.mock('../../redux/slices/heroesSlice', () => ({
  createHero: jest.fn(),
  updateHero: jest.fn(),
}))

jest.mock('../../utils/uploadUtils', () => ({
  handleUploadImagesCreate: jest.fn(),
  handleUploadImagesEdit: jest.fn(),
}))

describe('FormComponent', () => {
  let mockDispatch
  let mockNavigate

  beforeEach(() => {
    mockDispatch = jest.fn()
    useDispatch.mockReturnValue(mockDispatch)

    mockNavigate = jest.fn()
    useNavigate.mockReturnValue(mockNavigate)
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('renders component', () => {
    render(<FormComponent />)

    // check renders
    expect(screen.getByTestId('form-component')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Real Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('Superpowers')).toBeInTheDocument()
    expect(screen.getByLabelText('Catch Phrase')).toBeInTheDocument()
  })

  it('handles input changes', () => {
    render(<FormComponent />)

    // define samples
    const sampleName = 'Nick'
    const sampleRealName = 'Real Nikita'
    const sampleDescription = 'Description'
    const sampleSuper = 'Superpowers'
    const samplePhrase = 'Phrase'

    // define input and run onChange event with sample text
    const nameInput = screen.getByLabelText('Name')
    fireEvent.change(nameInput, { target: { value: sampleName } })

    const realNameInput = screen.getByLabelText('Real Name')
    fireEvent.change(realNameInput, { target: { value: sampleRealName } })

    const descInput = screen.getByLabelText('Description')
    fireEvent.change(descInput, { target: { value: sampleDescription } })

    const powersInput = screen.getByLabelText('Superpowers')
    fireEvent.change(powersInput, { target: { value: sampleSuper } })

    const phraseInput = screen.getByLabelText('Catch Phrase')
    fireEvent.change(phraseInput, { target: { value: samplePhrase } })

    // check our changes
    expect(nameInput.value).toBe(sampleName)
    expect(realNameInput.value).toBe(sampleRealName)
    expect(descInput.value).toBe(sampleDescription)
    expect(powersInput.value).toBe(sampleSuper)
    expect(phraseInput.value).toBe(samplePhrase)
  })

  it('dispatches createHero action on form submission', async () => {
    const mockUpdatedImages = ['image1.jpg', 'image2.jpg']

    // redefined mocked function to return images array
    handleUploadImagesCreate.mockResolvedValue(mockUpdatedImages);

    render(<FormComponent />)

    // run submit event
    fireEvent.submit(screen.getByTestId('form'));

    // check handleUploadImagesCreate to be called
    await expect(handleUploadImagesCreate).toHaveBeenCalledWith([]);

    // check dispatch called with createHero and all neccessarily properties and images  
    expect(mockDispatch).toHaveBeenCalledWith(createHero(expect.objectContaining({
      images: mockUpdatedImages,
    })));

    // check if navigation run
    expect(mockNavigate).toHaveBeenCalledWith('/');

    // check dispatch that can't be called
    expect(updateHero).not.toHaveBeenCalled();
  })

  it('dispatches updateHero action on form submission', async () => {
    const hero = {
      _id: '1',
      nickname: 'Superhero',
      images: [],
    };

    const mockUpdatedImages = ['image1.jpg', 'image2.jpg']

    // redefined mocked function to return images array
    handleUploadImagesEdit.mockResolvedValue(mockUpdatedImages);

    render(<FormComponent hero={hero} />);

    // run submit event
    fireEvent.submit(screen.getByTestId('form'));

    // check handleUploadImagesEdit to be called
    await expect(handleUploadImagesEdit).toHaveBeenCalledWith([]);

    // check dispatch called with updateHero and all neccessarily properties and images 
    expect(mockDispatch).toHaveBeenCalledWith(updateHero(expect.objectContaining({
      id: hero._id,
      images: mockUpdatedImages,
    })));

    // check if navigation run
    expect(mockNavigate).toHaveBeenCalledWith('/');

    // check dispatch that can't be called
    expect(createHero).not.toHaveBeenCalled();
  })
})