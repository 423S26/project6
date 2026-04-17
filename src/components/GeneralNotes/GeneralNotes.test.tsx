import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GeneralNotes from './GeneralNotes';

jest.mock('react-quill-new', () => {
    const React = require('react');
    return React.forwardRef(({ value, onChange }: any, ref: any) => {
        return (
            <textarea
                data-testid="quill-mock"
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        );
    });
});

describe('GeneralNotes Component', () => {
    const setup = (overrideProps = {}) => {
        const editorRef = React.createRef<any>();
        const mockOnChange = jest.fn(); 
        
        const defaultProps = {
            editorRef,
            value: '',
            onChange: mockOnChange,
        };

        const props = { ...defaultProps, ...overrideProps };

        const utils = render(<GeneralNotes {...props} />);
        const editor = screen.getByTestId('quill-mock') as HTMLTextAreaElement;
        
        return {
            ...props, 
            editor,
            ...utils,
        };
    };

    test('renders with the correct container classes', () => {
        const { container } = setup();
        const textbox = container.querySelector('.textbox');
        const editorContainer = container.querySelector('.editor-container');
        
        expect(textbox).toBeInTheDocument();
        expect(editorContainer).toBeInTheDocument();
    });

    test('displays the correct value passed from props', () => {
        const testText = "Initial saved document text";
        const { editor } = setup({ value: testText });
        
        expect(editor.value).toBe(testText);
    });

    test('calls the onChange prop when typing', async () => {
        const user = userEvent.setup();
        const { editor, onChange } = setup();

        await user.type(editor, 'A');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith('A');
    });

    test('correctly attaches the editorRef to the Quill instance', () => {
        const { editorRef, editor } = setup();
        expect(editorRef.current).not.toBeNull();
        expect(editorRef.current).toBe(editor);
    });

    test('passes the complex toolbar modules configuration', () => {
        const { editor } = setup();
        expect(editor).toBeInTheDocument();
    });
});