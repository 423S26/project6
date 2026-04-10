import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./GeneralNotes.css";

interface GeneralNotesProps {
    editorRef: React.RefObject<any>;
}

function GeneralNotes({ editorRef }: GeneralNotesProps) {
    const [content, setContent] = useState<string>("");

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
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    ref={editorRef}
                    style={{ height: '650px', paddingBottom: '42px' }} 
                />
            </div>
        </div>
    );
}

export default GeneralNotes;