import React from 'react'
import URLProduction from '../../helpers/URL';
import serverURL from '../../helpers/URL';
import './navbar.css'

const NavbarToggle = () => {
    const toggleMenu = () => {
        const toggleDiv = document.getElementById('toggle')
        const menuItems = document.getElementById("menuItems");
        if(menuItems.style.maxHeight=="0px"){
            toggleDiv.style.maxHeight = '150px';
            menuItems.style.maxHeight= "300px";
        }else{
            toggleDiv.style.maxHeight = '0px';
            menuItems.style.maxHeight= "0px";
        }
    
    }
    return (
        <img className="menu-icon" src={`${serverURL}/uploads/menu.png`} alt="menu"  width="40px" height="50px" onClick={()=>toggleMenu()} /> 
    );
};

export default NavbarToggle;