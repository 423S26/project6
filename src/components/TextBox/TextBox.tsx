import React from "react";
import "./TextBox.css";
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor'

interface TextBoxProps {
    editorRef: React.RefObject<DocumentEditorContainerComponent | null>;
}

DocumentEditorContainerComponent.Inject(Toolbar);

function TextBox({ editorRef }: TextBoxProps) {
    return (
        <div className="textbox">

            <div className="editor-container">
                <DocumentEditorContainerComponent 
                    width="100%" 
                    height='590px'
                    enableToolbar={true} 
                    ref={editorRef}
                />
            </div>
        </div>
    );
}

export default TextBox;
