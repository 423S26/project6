import React from "react";
import ReactQuill from "react-quill";
import "react-quill-new/dist/quill.snow.css"; 

interface SoapBoxProps {
    title: string;
    value: string;
    onChange: (value: string) => void;
}

function SoapBox({ title, value, onChange }: SoapBoxProps) {
    return (
        <div className="textbox">
            <h2 className="title">{title}</h2>

            <div className="editor-container">
                <ReactQuill 
                    theme="snow" 
                    value={value} 
                    onChange={onChange} 
                    style={{ height: '200px', marginBottom: '40px' }} 
                />
            </div>
        </div>
    );
}

export default SoapBox;