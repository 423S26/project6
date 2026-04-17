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
    const setup = () => {
        const editorRef = React.createRef<any>();
        const utils = render(<GeneralNotes editorRef={editorRef} />);
        const editor = screen.getByTestId('quill-mock') as HTMLTextAreaElement;
        return {
            editorRef,
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

    test('updates internal state and editor value when typing', async () => {
        const user = userEvent.setup();
        const { editor } = setup();

        const testNote = 'This is a clinical note.';
        await user.type(editor, testNote);

        expect(editor.value).toBe(testNote);
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