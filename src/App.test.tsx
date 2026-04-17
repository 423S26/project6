import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('react-quill-new', () => {
    const React = require('react');
    return React.forwardRef(({ value, onChange }: any, ref: any) => {
        React.useImperativeHandle(ref, () => ({
            getEditor: () => ({
                root: {
                    innerHTML: '<p>Mock Document Content</p>'
                }
            })
        }));
        return (
            <textarea
                data-testid="quill-mock"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
            />
        );
    });
});

jest.mock('./components/Header/Header', () => ({ activeTab, setActiveTab }: any) => (
    <div data-testid="mock-header">
        <button onClick={() => setActiveTab('document')}>General Notes</button>
        <button onClick={() => setActiveTab('soap')}>SOAP Notes</button>
    </div>
));

const mockHtml2PdfSet = jest.fn();
const mockHtml2PdfFrom = jest.fn();
const mockHtml2PdfSave = jest.fn().mockResolvedValue(true);

const mockChain = {
    set: mockHtml2PdfSet,
    from: mockHtml2PdfFrom,
    save: mockHtml2PdfSave
};

mockHtml2PdfSet.mockReturnValue(mockChain);
mockHtml2PdfFrom.mockReturnValue(mockChain);

jest.mock('html2pdf.js', () => {
    return jest.fn(() => mockChain);
});

describe('App Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        
        global.URL.createObjectURL = jest.fn(() => 'mock-url');
        global.URL.revokeObjectURL = jest.fn();
    });

    test('renders default General Document tab correctly', () => {
        render(<App />);
        
        expect(screen.getByTestId('mock-header')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter document name.../i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save Document \(\.doc\)/i })).toBeInTheDocument();
        expect(screen.getAllByTestId('quill-mock')).toHaveLength(1);
    });

    test('updates the fileName state when the user types', () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/Enter document name.../i) as HTMLInputElement;
        
        fireEvent.change(input, { target: { value: 'Patient_John_Doe' } });
        
        expect(input.value).toBe('Patient_John_Doe');
    });

    test('switches to SOAP Notes tab and displays the four sections', () => {
        render(<App />);
        
        fireEvent.click(screen.getByRole('button', { name: /SOAP Notes/i }));

        expect(screen.getByRole('button', { name: /Save Document \(pdf\)/i })).toBeInTheDocument();

        const sections = ['Subjective', 'Objective', 'Assessment', 'Plan'];
        sections.forEach(title => {
            const headings = screen.getAllByRole('heading', { name: title });
            expect(headings).toHaveLength(2);
        });

        expect(screen.getAllByTestId('quill-mock')).toHaveLength(4);
    });

    test('triggers Word document generation when saving General Notes', () => {
        render(<App />);
        
        const input = screen.getByPlaceholderText(/Enter document name.../i);
        fireEvent.change(input, { target: { value: 'My_Doc' } });

        const saveButton = screen.getByRole('button', { name: /Save Document \(\.doc\)/i });
        fireEvent.click(saveButton);

        expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
        expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1);
    });

});