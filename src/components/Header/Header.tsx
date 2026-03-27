import React from "react";
import "./Header.css";

interface HeaderProps {
    activeTab: "document" | "soap";
    setActiveTab: (tab: "document" | "soap") => void;
}

function Header({ activeTab, setActiveTab }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-title">
                <h1>SOAP Notes Editor</h1>
            </div>

            <div className="header-nav">
                <button 
                    className={`nav-button ${activeTab === 'document' ? 'active' : ''}`}
                    onClick={() => setActiveTab('document')}
                >
                    General Document
                </button>
                <button 
                    className={`nav-button ${activeTab === 'soap' ? 'active' : ''}`}
                    onClick={() => setActiveTab('soap')}
                >
                    SOAP Notes
                </button>
            </div>

            <div className="header-docs-link">
                <a href="https://423s26.github.io/project6/user-documentation.html" target="_blank" rel="noopener noreferrer">
                    <h3>Need Help?</h3>
                </a>
            </div>
        </header>
    );
}

export default Header;