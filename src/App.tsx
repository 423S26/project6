import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor';
import Header from './components/Header/Header';
import SoapBox from './components/SoapBox/SoapBox';
import TextBox from './components/TextBox/TextBox';
import './App.css';

function App() {
    const [activeTab, setActiveTab] = useState<"document" | "soap">("document");
    const [fileName, setFileName] = useState("");

    const [subjective, setSubjective] = useState("");
    const [objective, setObjective] = useState("");
    const [assessment, setAssessment] = useState("");
    const [plan, setPlan] = useState("");

    const printRef = useRef<HTMLDivElement>(null);

    const syncfusionRef = useRef<DocumentEditorContainerComponent | null>(null);

    const handleSaveDocument = () => {
        const finalName = fileName.trim() === "" ? "Untitled_Document" : fileName;
        syncfusionRef.current?.documentEditor.save(finalName, 'Docx');
    };

    const handleSaveSoapToPDF = () => {
        const element = printRef.current;
        if (!element) return;

        const finalName = fileName.trim() === "" ? "Untitled_SOAP_Note" : fileName;

        const opt = {
            margin:       0.5,
            filename:     `${finalName}.pdf`,
            image:        { type: 'jpeg' as const, quality: 0.98 },
            html2canvas:  { scale: 2 }, 
            jsPDF:        { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const }
        };

        element.style.display = 'block';
        
        html2pdf().set(opt).from(element).save().then(() => {
            element.style.display = 'none';
        });
    };

    return (
        <div className="App">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="top-action-bar">
                
                <div className="filename-container">
                    <label className='filename-label'>
                        File Name:
                    </label>
                    <input
                        type="text" 
                        className="filename-input"
                        value={fileName} 
                        onChange={(e) => setFileName(e.target.value)} 
                        placeholder="Enter document name..."
                    />
                </div>

                {activeTab === 'document' ? (
                    <button className="main-save-btn" onClick={handleSaveDocument}>
                        Save Document (.docx)
                    </button>
                ) : (
                    <button className="main-save-btn" onClick={handleSaveSoapToPDF}>
                        Save Document (pdf)
                    </button>
                )}

            </div>

            <div className="main-content-container">
                {activeTab === "document" ? (
                    <TextBox editorRef={syncfusionRef} />
                ) : (
                    <>
                        <SoapBox title="Subjective" value={subjective} onChange={setSubjective} />
                        <SoapBox title="Objective" value={objective} onChange={setObjective} />
                        <SoapBox title="Assessment" value={assessment} onChange={setAssessment} />
                        <SoapBox title="Plan" value={plan} onChange={setPlan} />
                    </>
                )}
            </div>

            <div className="hidden-pdf-wrapper">
                <div ref={printRef} className="pdf-print-area">
                    <h1 className="pdf-title">
                        {fileName.trim() === "" ? "SOAP Notes" : fileName}
                    </h1>
                    
                    <div className="pdf-section">
                        <h2>Subjective</h2>
                        <div dangerouslySetInnerHTML={{ __html: subjective }} />
                    </div>

                    <div className="pdf-section">
                        <h2>Objective</h2>
                        <div dangerouslySetInnerHTML={{ __html: objective }} />
                    </div>

                    <div className="pdf-section">
                        <h2>Assessment</h2>
                        <div dangerouslySetInnerHTML={{ __html: assessment }} />
                    </div>

                    <div className="pdf-section">
                        <h2>Plan</h2>
                        <div dangerouslySetInnerHTML={{ __html: plan }} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default App;