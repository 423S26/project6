import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SoapBox from './SoapBox';

jest.mock('react-quill-new', () => {
    return function MockQuill({ value, onChange }: any) {
        return (
            <textarea
                data-testid="quill-mock"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        );
    };
});

describe('SoapBox Component', () => {
    const mockOnChange = jest.fn();

    test('renders the correct title', () => {
        render(
            <SoapBox 
                title="Subjective" 
                value="" 
                onChange={mockOnChange} 
            />
        );
        expect(screen.getByText(/Subjective/i)).toBeInTheDocument();
    });

    test('displays the initial value in the editor', () => {
        const initialText = '<p>Patient reports headache.</p>';
        render(
            <SoapBox 
                title="Subjective" 
                value={initialText} 
                onChange={mockOnChange} 
            />
        );
        const editor = screen.getByTestId('quill-mock') as HTMLTextAreaElement;
        expect(editor.value).toBe(initialText);
    });

    test('calls onChange when text is entered', () => {
        render(
            <SoapBox 
                title="Objective" 
                value="" 
                onChange={mockOnChange} 
            />
        );
        const editor = screen.getByTestId('quill-mock');
        
        fireEvent.change(editor, { target: { value: 'BP 120/80' } });
        
        expect(mockOnChange).toHaveBeenCalledWith('BP 120/80');
    });

    test('applies the correct CSS class for styling', () => {
        const { container } = render(
            <SoapBox 
                title="Assessment" 
                value="" 
                onChange={mockOnChange} 
            />
        );
        expect(container.firstChild).toHaveClass('textbox');
    });
});