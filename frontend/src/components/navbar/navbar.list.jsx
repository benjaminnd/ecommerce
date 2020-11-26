import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import NavItem from './navbar.item';
import Button from '../buttons/button.component';
import { connect } from 'react-redux';
import {logout} from '../../data/reducers/auth';
import {Badge} from 'antd' 
import { ShoppingCartOutlined } from '@ant-design/icons';
const NavbarList = ({history, logout, cart, cartSum, userCart, isAuth}) => {
        const [CartCount, setCartCount] = useState(0)
        const [userCartCount, setUserCartCount] = useState(0)
        const isActive= (history, path) => {
            if(history.location.pathname === path) {
                return 'text-primary';
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
            <ul className="font-bold flex-wrap flex md:mr-5 flex-col md:flex-row text-center">
                <NavItem link='/' name="Home" listStyle={isActive(history, '/')} />
                <NavItem link='/shop' name="Shop" listStyle={isActive(history, '/shop')} />
                <NavItem link='/dashboard' name="Dashboard" listStyle={isActive(history, '/dashboard')} />
                {isAuth? (<NavItem link='/upload' name='Upload' listStyle={isActive(history, '/upload')}/>) : ''}
                {isAuth? (<Button title='Logout' addStyle='hover:text-primary' action ={()=>{logout()}} />) : 
                (   <>
                    <Button title='Login' addStyle='hover:text-primary' isButton={false} href='/login'></Button>
                    <Button title='Register' addStyle='hover:text-primary' isButton={false} href='/register'></Button>
                    </>
                )}

                <Badge count={isAuth? userCartCount : CartCount}>
                    <a href="/user/cart" style={{ marginRight: -22 , color:'#667777'}}>
                        <ShoppingCartOutlined style={{fontSize: '36px', marginTop: '2px'}}/>
                    </a>
                </Badge>                
            </ul>
        
        )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    userCart: state.auth.cart,
    cart: state.cart.cart,
    cartSum: state.cart.total
})

export default connect(mapStateToProps, {logout})(withRouter(NavbarList));



