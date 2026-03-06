import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@syncfusion/ej2-react-documenteditor', () => {
  const React = require('react');

  const MockEditor = React.forwardRef((props: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      documentEditor: {
        save: jest.fn()
      }
    }));
    return <div data-testid="mock-editor">{props.title}</div>;
  });

  (MockEditor as any).Inject = jest.fn();

  return {
    DocumentEditorContainerComponent: MockEditor,
    Toolbar: jest.fn(),
  };
});

describe('App Tests', () => {

  test('renders the Header component', () => {
    render(<App />);
    const headerTitle = screen.getByText(/SOAP Notes Editor/i);
    expect(headerTitle).toBeInTheDocument();
  });

  test('renders all four SOAP sections with correct titles', () => {
    render(<App />);

    const sections = ['Subjective', 'Objective', 'Assessment', 'Plan'];

    sections.forEach(title => {
      const element = screen.getByText(title);
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe('H2');
    });
  });

  test('renders the correct number of text editors', () => {
    render(<App />);
    const saveButtons = screen.getAllByRole('button', { name: /save/i });
    expect(saveButtons).toHaveLength(4);
  });
});
