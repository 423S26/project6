import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
    const mockSetActiveTab = jest.fn();

    test('renders without crashing', () => {
        render(<Header activeTab="document" setActiveTab={mockSetActiveTab} />);
    });

    test('renders the correct title', () => {
        render(<Header activeTab="document" setActiveTab={mockSetActiveTab} />);
        const titleElement = screen.getByText(/SOAP Notes Editor/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('contains a link to the documentation', () => {
        render(<Header activeTab="document" setActiveTab={mockSetActiveTab} />);
        const linkElement = screen.getByRole('link', { name: /Need help\?/i });
        expect(linkElement).toBeInTheDocument();
        
        expect(linkElement).toHaveAttribute('href', 'https://423s26.github.io/project6/user-documentation.html');
    })
})