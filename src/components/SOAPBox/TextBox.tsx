import React from "react";
import { useRef } from 'react';
import "./TextBox.css";
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor'

interface Title {
    title : string
}
DocumentEditorContainerComponent.Inject(Toolbar);
function TextBox({ title }: Title) {
    let container = useRef<DocumentEditorContainerComponent | null>(null);
    function save() {
        container.current?.documentEditor.save('sample', 'Docx');
    }
    return (
        <div className="textbox">
            <h2 className="title">
                { title }
            </h2>
            <DocumentEditorContainerComponent width="1200px" height={'590px'}
            enableToolbar={true} ref={container}></DocumentEditorContainerComponent>
            <button onClick={save}>Save</button>
        </div>
    );
}

export default TextBox;
