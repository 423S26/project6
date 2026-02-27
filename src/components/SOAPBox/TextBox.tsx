import React from "react";
import "./TextBox.css";
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor'

interface Title {
    title : string
}

function TextBox({ title }: Title) {
    return (
        <div className="textbox">
            <h2 className="title">
                { title }
            </h2>
            <DocumentEditorContainerComponent width="1200px"></DocumentEditorContainerComponent>
        </div>
    );
}

export default TextBox;
