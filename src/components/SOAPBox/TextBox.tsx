import React from "react";
import "./TextBox.css";
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor'

interface Prop {
    title : string
}

function TextBox({ title }: Prop) {
    return (
        <div>
            <h2>
                { title }
            </h2>
            <DocumentEditorContainerComponent height='300px'></DocumentEditorContainerComponent>
        </div>
    );
}

export default TextBox;