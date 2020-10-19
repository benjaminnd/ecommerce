import React from 'react';
import { withRouter } from 'react-router-dom';
import NavItem from './navbar.item';
import Button from '../buttons/button.component';
import { connect } from 'react-redux';
import {logout} from '../../data/reducers/auth'
const NavbarList = ({history, logout, isAuth}) => {
        const isActive= (history, path) => {
            if(history.location.pathname === path) {
                return 'text-primary';
            } else {
                return ''
            }
        }
        return (
            <ul className="font-bold flex-wrap flex md:mr-5 flex-col md:flex-row text-center">
                <NavItem link='/' name="Home" listStyle={isActive(history, '/')} />
                <NavItem link='/shop' name="Shop" listStyle={isActive(history, '/shop')} />
                <NavItem link='/dashboard' name="Dashboard" listStyle={isActive(history, '/dashboard')} />
                {isAuth? (<NavItem link='/upload' name='Upload' listStyle={isActive(history, '/upload')}/>) : ''}
                {isAuth? (<Button title='Sign out' addStyle='hover:text-primary' action ={()=>{logout()}} />) : 
                (   <>
                    <Button title='Login' addStyle='hover:text-primary' isButton={false} href='/login'></Button>
                    <Button title='Register' addStyle='hover:text-primary' isButton={false} href='/register'></Button>
                    </>
                )}
                
                <Button isButton={false} title='Cart' href='/cart' addStyle='bg-primary text-white uppercase w-24 md:ml-6 bg-shop-logo'></Button>
                
            </ul>
        
        )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(withRouter(NavbarList));



