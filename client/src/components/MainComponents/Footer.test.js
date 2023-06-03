import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '..';
import '@testing-library/jest-dom';

describe('Footer', () => {
	it('renders the footer text', () => {
		render(<Footer />);

		const footerElement = screen.getByText('Made with 💜 by Nikita Yurchenko');

		expect(footerElement).toBeInTheDocument();
	});
});
