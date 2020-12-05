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
        // <div className="block md:hidden">
        //     <button className={`focus:outline-none menu-icon ${active ? 'menu-icon--isActive' : ''} ml-4 self-center cursor-pointer`} onClick={menuState}>
        //         <div className="menu-icon__bar"></div>
        //         <div className="menu-icon__bar"></div>
        //         <div className="menu-icon__bar"></div>
        //     </button>
        // </div>
        <img className="menu-icon" src={`${URLProduction}/uploads/menu.png`} alt="menu"  width="40px" height="50px" onClick={()=>toggleMenu()} /> 

    );
};

export default NavbarToggle;