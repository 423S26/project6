import React from 'react';
import Header from './components/Header/Header';
import TextBox from './components/TextBox/TextBox'
import './App.css';

function App() {
  return (
    <div className="App">
        <Header />

        <TextBox title="Subjective" />
        <TextBox title="Objective" />
        <TextBox title="Assessment" />
        <TextBox title="Plan" />

    </div>
  );
}

export default App;