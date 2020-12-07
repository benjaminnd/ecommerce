import React from 'react'
import URLProduction from '../../helpers/URL';
import serverURL from '../../helpers/URL';
import './navbar.css'

const NavbarToggle = () => {
    const toggleMenu = () => {
        const navBar = document.getElementById("navBar");
        const menuItems = document.getElementById("menuItems");
        if(menuItems.style.maxHeight=="0px"){
            menuItems.style.maxHeight= "300px";
            navBar.style.height = "350px";
            navBar.style.maxHeight = "350px";
        }else{
            menuItems.style.maxHeight= "0px";
            navBar.style.height = "150px";
        }
    
    }
    return (
        <img className="menu-icon" src={`${serverURL}/uploads/menu.png`} alt="menu"  width="40px" height="50px" onClick={()=>toggleMenu()} /> 
    );
};

export default NavbarToggle;