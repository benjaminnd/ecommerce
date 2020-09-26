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
          <nav className='navbar'>
            {/* Left Side */}
            <div className='flex justify-between w-full md:w-32 items-center'>
              <Link to='/' className='logo w-16 animate'>
                <img src={require('../../assets/avatar.png')} alt='Main Logo' />
              </Link>
              <NavbarToggle active={active} menuState={menuState} />
            </div>
    
            {/* Right Side */}
            <div className={`${active ? 'flex' : 'hidden'} md:flex`}>
              <NavbarList/>
            </div>
          </nav>
        </Container>
      );
 }

 export default Navbar;