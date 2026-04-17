import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SoapBox from './SoapBox';

jest.mock('react-quill-new', () => {
    return function MockQuill({ value, onChange, style }: any) {
        return (
            <textarea
                data-testid="quill-mock"
                value={value}
                style={style}
                onChange={(e) => onChange(e.target.value)}
            />
        );
    };
});

describe('SoapBox Component', () => {
    const defaultProps = {
        title: 'Subjective',
        value: '',
        onChange: jest.fn(),
    };

    const setup = (props = {}) => {
        const mergedProps = { ...defaultProps, ...props };
        const user = userEvent.setup();
        const utils = render(<SoapBox {...mergedProps} />);
        const editor = screen.getByTestId('quill-mock') as HTMLTextAreaElement;
        return { ...utils, user, editor, mergedProps };
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the title using correct semantic heading', () => {
        setup({ title: 'Plan' });
        const title = screen.getByRole('heading', { level: 2, name: /plan/i });
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('title');
    });

    test('renders complex HTML values correctly', () => {
        const htmlContent = '<ul><li>List Item</li></ul>';
        const { editor } = setup({ value: htmlContent });
        
        expect(editor.value).toBe(htmlContent);
    });

    test('applies layout styles to the editor wrapper', () => {
        const { editor } = setup();
    
        expect(editor).toHaveStyle({
            height: '200px',
            marginBottom: '40px'
        });
    });

    test('maintains correct DOM structure for styling', () => {
        const { container } = setup();
        
        const outerDiv = container.firstChild as HTMLElement;
        const editorWrapper = container.querySelector('.editor-container');

        expect(outerDiv).toHaveClass('textbox');
        expect(editorWrapper).toBeInTheDocument();
        expect(editorWrapper?.contains(screen.getByTestId('quill-mock'))).toBe(true);
    });

    test('is accessible: title is associated with context', () => {
        setup({ title: 'Objective Data' });
        expect(screen.getByRole('heading', { name: /objective data/i })).toBeVisible();
    });
});