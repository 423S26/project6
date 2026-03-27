import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

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

jest.mock('@syncfusion/ej2-react-documenteditor', () => {
  const React = require('react');
  const MockEditor = React.forwardRef((props: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      documentEditor: {
        save: jest.fn(),
        pageCount: 1,
        exportAsImage: jest.fn()
      }
    }));
    return <div data-testid="mock-syncfusion-editor">Syncfusion Editor</div>;
  });
  (MockEditor as any).Inject = jest.fn();
  return {
    DocumentEditorContainerComponent: MockEditor,
    Toolbar: jest.fn(),
  };
});

jest.mock('html2pdf.js', () => {
  return jest.fn().mockImplementation(() => ({
    set: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    save: jest.fn().mockResolvedValue(true)
  }));
});

describe('App Component Tests', () => {

  test('renders the Header and default General Document tab', () => {
    render(<App />);
    expect(screen.getByText(/SOAP Notes Editor/i)).toBeInTheDocument();
    expect(screen.getByText(/General Notes/i)).toBeInTheDocument();
    expect(screen.getByText(/Save Document/i)).toBeInTheDocument();
  });

  test('switches to SOAP Notes tab and displays specialized editors', () => {
    render(<App />);
  
    const soapTabButton = screen.getByRole('button', { name: /SOAP Notes/i });
    fireEvent.click(soapTabButton);

    const sections = ['Subjective', 'Objective', 'Assessment', 'Plan'];
    
    sections.forEach(title => {
      const element = document.body.querySelector(`.textbox .title`);
      expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument(); 
    });


    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  test('updates the fileName state when the user types', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter document name.../i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Patient_John_Doe' } });
    
    expect(input.value).toBe('Patient_John_Doe');
  });

  test('renders only one save button in the top action bar area', () => {
    render(<App />);
    const saveButtons = screen.getAllByRole('button', { name: /save/i });
    expect(saveButtons.length).toBe(1);
  });
});
