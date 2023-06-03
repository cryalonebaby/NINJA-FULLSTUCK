import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '..';
import '@testing-library/jest-dom';

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));

describe('Navbar', () => {
	let mockNavigate

	beforeEach(() => {
		mockNavigate = jest.fn()
		useNavigate.mockReturnValue(mockNavigate)
	})

	afterEach(() => {
		jest.clearAllMocks();
	})

	it('renders the Navbar component', () => {
		render(<Navbar />);

		// Check if the Navbar component is rendered
		const navbarElement = screen.getByRole('navigation');
		expect(navbarElement).toBeInTheDocument();
	});

	it('navigates to create page when add button is clicked', () => {
		render(<Navbar />);

		// Find and click the add button
		const addButton = screen.getByTestId('AddIcon');
		fireEvent.click(addButton);

		// Check if the navigate function is called with the correct path
		expect(mockNavigate).toHaveBeenCalledWith('/create');
	});

	it('navigates to home page when logo is clicked', () => {

		render(<Navbar />);

		// Find and click the logo
		const logoElement = screen.getByText(/SUPERHEROES/i);
		fireEvent.click(logoElement);

		// Check if the navigate function is called with the correct path
		expect(mockNavigate).toHaveBeenCalledWith('/');
	});
});
