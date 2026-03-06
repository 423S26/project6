import React from "react";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-center">
                <h1>SOAP Notes Editor</h1>
            </div>
            <div className="header-docs-link">
                <a href="https://423s26.github.io/project6/user-documentation/">
                    <h3>
                        Need Help?
                    </h3>
                </a>
            </div>
        </header>
    );
}

export default Header;