import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import NavItem from './navbar.item';
import Button from '../buttons/button.component';
import { connect } from 'react-redux';
import {logout} from '../../data/reducers/auth';
import {Badge} from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons';
import NavbarToggle from './navbar.toggle';
const NavbarList = ({history, logout, cart, cartSum, userCart, isAuth}) => {
        const [CartCount, setCartCount] = useState(0)
        const [userCartCount, setUserCartCount] = useState(0)
        const isActive= (history, path) => {
            if(history.location.pathname === path) {
                return 'activeItem';
            } else {
                return ''
            }
        }
        useEffect(() => {

            console.log('navbar list cart change')
            //use array reducer to sum up the count of cart
            const reducer = (accumulator, currentValue) => accumulator + currentValue.quantity
            const guestReducer = (accumulator, currentValue) => accumulator + currentValue.cartQuant
            if(isAuth){
                setUserCartCount(userCart.reduce(reducer, 0)) 
            } else {
                setCartCount(cart.reduce(guestReducer, 0))
            }
        }, [cart, userCart])
        return (
            <>
            <nav>
                <ul id="menuItems">
                    <NavItem link='/' name="Home" listStyle={isActive(history, '/')} />
                    <NavItem link='/shop' name="Shop" listStyle={isActive(history, '/shop')} />
                    {/* <NavItem link='/dashboard' name="Dashboard" listStyle={isActive(history, '/dashboard')} /> */}
                    {isAuth? (<NavItem link='/upload' name='Upload' listStyle={isActive(history, '/upload')}/>) : ''}
                    {isAuth? (<NavItem link='/' name="Logout" listStyle='hover:text-primary' action ={()=>{logout()}} />) : 
                    (   <>
                        <NavItem name='Login' listStyle='hover:text-primary' link='/login'></NavItem>
                        <NavItem name='Register' listStyle='hover:text-primary' link='/register'></NavItem>
                        </>
                    )}
                </ul>
            </nav>
            <Badge count={isAuth? userCartCount : CartCount}>
                <a href="/user/cart">
                    <img src={`http://localhost:5000/uploads/cart.png`} alt="cart"  width="40px" height="50px" />
                </a>
            </Badge>              
            <NavbarToggle/>
            </>
        
        )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    userCart: state.auth.cart,
    cart: state.cart.cart,
    cartSum: state.cart.total
})

export default connect(mapStateToProps, {logout})(withRouter(NavbarList));



