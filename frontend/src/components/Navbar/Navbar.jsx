import {NavLink} from "react-router";
import React from "react";
import "./Navbar.css"

function Navbar() {
    return (
        <nav>
            <NavLink to="/">
                Home
            </NavLink>

            <NavLink to="/forms">
                Forms
            </NavLink>

            <NavLink to="/patients">
                Patients
            </NavLink>
        </nav>
    );
}

export default Navbar;