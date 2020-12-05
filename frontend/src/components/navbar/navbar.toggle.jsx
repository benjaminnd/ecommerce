import React from 'react'
import URLProduction from '../../helpers/URL';
import './navbar.css'

const NavbarToggle = () => {
    const toggleMenu = () => {
        const menuItems = document.getElementById("menuItems");
        if(menuItems.style.maxHeight=="0px"){
        menuItems.style.maxHeight= "300px";
        }else{
            menuItems.style.maxHeight= "0px";
        }
    
    }
    return (
        <img className="menu-icon" src={`${URLProduction}/uploads/menu.png`} alt="menu"  width="40px" height="50px" onClick={()=>toggleMenu()} /> 
    );
};

export default NavbarToggle;