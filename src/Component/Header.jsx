import React from 'react'

import Avatar from '@mui/material/Avatar';
import shaan from "../img/shaan.jpg"
import logo from "../img/logo.png"




function Header() {
    return (
        <header className="header-container">
            <img src={logo} alt="Logo" />
            <input type="text" placeholder="Search..." />
            <Avatar
                alt="Remy Sharp"
                src={shaan}
                sx={{ width: 46, height: 46, border: "2px solid #fff" }}
            />
        </header>
    )
}
export default Header;
