import React from 'react';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-react-documenteditor'
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <div className="App">
        <Header />

        <DocumentEditorContainerComponent height='900px'></DocumentEditorContainerComponent>

    </div>
  );
}

export default App;
