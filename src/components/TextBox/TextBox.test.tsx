import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import TextBox from './TextBox';

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

describe('TextBox', () => {
    test('should render correctly', () => {
        render(<TextBox title='Test' />);
    });

    test('should render correct title', () => {
        render(<TextBox title='Test' />);
        const titleElement = screen.getByText(/Test/i)
        expect(titleElement).toBeInTheDocument();
    });

    test('should render save button', () => {
        render(<TextBox title='Test' />);
        const saveButton = screen.getByRole('button', { name: /Save/i });
        expect(saveButton).toBeInTheDocument();
    })

    test('should call save function when save button is pressed', () => {
        render(<TextBox title='Test' />);
        const saveButton = screen.getByRole('button', { name: /Save/i });
        fireEvent.click(saveButton);
    })


})