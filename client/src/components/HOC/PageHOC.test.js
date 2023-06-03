import React from 'react';
import { render, screen } from '@testing-library/react';

import { useSelector } from 'react-redux';

import { PageHOC } from '..'
import '@testing-library/jest-dom';

// mock function
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}))

describe('PageHOC', () => {
  const MockComponent = () => <div data-testid="mock-component">Mock Component</div>;

  // Redefine neccessary functions to particular values before each test
  beforeEach(() => {
    useSelector.mockReturnValue({ heroes: { status: 'loaded', notificationText: 'mockText' } })
  })

  // Clear functions after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Navbar', () => {
    // create wrapper for HOC
    const WrappedComponent = PageHOC(MockComponent);
    render(WrappedComponent);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  })

  it('renders main component', () => {
    const WrappedComponent = PageHOC(MockComponent);
    render(WrappedComponent);

    expect(screen.getByTestId('mock-component')).toBeInTheDocument();
  })

  it('renders Footer', () => {
    const WrappedComponent = PageHOC(MockComponent);
    render(WrappedComponent);

    expect(screen.getByText('Made with 💜 by Nikita Yurchenko')).toBeInTheDocument();
  })

  it('renders Notification', () => {
    const WrappedComponent = PageHOC(MockComponent);
    render(WrappedComponent);

    expect(screen.getByTestId('notification')).toBeInTheDocument();
  })
})