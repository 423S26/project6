import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Forms from "./pages/Forms";
import Patients from "./pages/Patients";
import Editor from "./components/Editor/Editor";



function App() {
    return (
        <BrowserRouter>
            <Header />
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/forms" element={<Forms />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/editor" element={<Editor />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
export default App;