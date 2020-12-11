import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Container from '../containers/container.component';
import NavbarToggle from './navbar.toggle';
import NavbarList from './navbar.list';

/**
 * 
 */

 const Navbar = () => {
    const [active, setActive] = useState(false);
    const menuState = () => {
        setActive(!active)
    }
    
    return (
        <Container>
          <div id='navBar'>
            {/* Left Side */}
            <div className="logo">
              <img src={require('../../assets/bennystore.png')} alt='Main Logo'  width="150px" />
            </div>
            {/* <div className='flex justify-between w-full md:w-32 items-center'>
                <img src={require('../../assets/bennystore.png')} alt='Main Logo' />
                <NavbarToggle active={active} menuState={menuState} />
            </div> */}
    
            {/* Right Side */}
            {/* <div className={`${active ? 'flex' : 'hidden'} md:flex`}> */}
              <NavbarList/>
            {/* </div> */}
          </div>
          <div id="toggle"></div>
        </Container>
      );
 }

 export default Navbar;