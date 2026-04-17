import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface GeneralNotesProps {
    editorRef: React.RefObject<any>;
    value: string;
    onChange: (value: string) => void;
}

function GeneralNotes({ editorRef, value, onChange }: GeneralNotesProps) {

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
            [{ 'header': 1 }, { 'header': 2 }],               
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      
            [{ 'indent': '-1'}, { 'indent': '+1' }],          
            [{ 'direction': 'rtl' }],                        
            [{ 'size': ['small', false, 'large', 'huge'] }],  
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }], 
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']     
        ],
    };

    return (
        <div className="textbox">
            <div className="editor-container">
                <ReactQuill 
                    theme="snow"
                    value={value}         
                    onChange={onChange}   
                    modules={modules}
                    ref={editorRef}
                    style={{ height: '650px', paddingBottom: '42px' }} 
                />
            </div>
        </div>
    );
}

export default GeneralNotes;