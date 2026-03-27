import React from 'react';
import { render, screen } from '@testing-library/react';
import TextBox from './TextBox';

jest.mock('@syncfusion/ej2-react-documenteditor', () => {
    const React = require('react');

    const MockEditor = React.forwardRef((props: any, ref: any) => {
        React.useImperativeHandle(ref, () => ({
            documentEditor: {
                save: jest.fn()
            }
        }));
        return <div data-testid="mock-editor">Mock Editor</div>;
    });

    (MockEditor as any).Inject = jest.fn();

    return {
        DocumentEditorContainerComponent: MockEditor,
        Toolbar: jest.fn(),
    };
});

describe('TextBox', () => {
    const mockRef = { current: null };

    test('should render correctly', () => {
        render(<TextBox editorRef={mockRef} />);
    });
})