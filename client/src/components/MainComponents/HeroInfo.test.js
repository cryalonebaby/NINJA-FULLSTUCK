import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroInfo } from '..';
import '@testing-library/jest-dom';

// check each input to display data from prop
describe('HeroInfo', () => {
  it('renders the hero nickname', () => {
    const hero = {
      nickname: 'Superhero',
      images: [],
    };

    render(<HeroInfo hero={hero} />);

    const nicknameElement = screen.getByTestId('nickname');

    expect(nicknameElement).toBeInTheDocument();
    expect(nicknameElement.textContent).toBe('Superhero');
  });

  it('renders the hero real name', () => {
    const hero = {
      real_name: 'John Doe',
      images: [],
    };

    render(<HeroInfo hero={hero} />);

    const realNameElement = screen.getByTestId('real_name');

    expect(realNameElement).toBeInTheDocument();
    expect(realNameElement.textContent).toBe('John Doe');
  });

  it('renders the hero description', () => {
    const hero = {
      origin_description: 'Lorem ipsum dolor sit amet',
      images: [],
    };

    render(<HeroInfo hero={hero} />);

    const descriptionElement = screen.getByTestId('origin_description');

    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.textContent).toBe('Lorem ipsum dolor sit amet');
  });

  it('renders the hero superpowers', () => {
    const hero = {
      superpowers: 'Super strength, Flight',
      images: [],
    };

    render(<HeroInfo hero={hero} />);

    const superpowersElement = screen.getByTestId('superpowers');

    expect(superpowersElement).toBeInTheDocument();
    expect(superpowersElement.textContent).toBe('Super strength, Flight');
  });

  it('renders the hero catch phrase', () => {
    const hero = {
      catch_phrase: 'I am the hero!',
      images: [],
    };

    render(<HeroInfo hero={hero} />);

    const catchPhraseElement = screen.getByTestId('catch_phrase');

    expect(catchPhraseElement).toBeInTheDocument();
    expect(catchPhraseElement.textContent).toBe('I am the hero!');
  });
});
