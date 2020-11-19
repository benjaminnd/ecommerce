import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import CartTable from '../components/tables/CartTable';
import {getCartItems, removeItemUser} from '../data/reducers/auth'
import {removeItemGuest} from '../data/reducers/cart'

function CartPage({userCart, getCartItems, removeItemUser, removeItemGuest, userCartDetail, guestCart, isAuth}) {
    const [Cart, setCart] = useState([])
    useEffect(()=>{
        console.log('guest cart...', guestCart)
        //get cart items from state users
    if (userCart.length > 0) {
        console.log('user cart...', userCart)
     getCartItems(userCart)
    } 
    },[userCart])

    const handleRemoveItem = () => {
        if(isAuth){
            return removeItemUser
        }else{
            return removeItemGuest
        }
    }

    return (
        <div className="w-5/6 m-12 m-auto">
            <div className=""><h1 className="font-bold text-xl pb-2 my-6">Cart Items</h1></div>
            <div>
                { isAuth && userCart.length > 0  && <CartTable cart={userCartDetail} removeItem={removeItemUser}/>}
                { !isAuth && guestCart.length > 0  && <CartTable cart={guestCart} removeItem={removeItemGuest}/>}
            </div>
        </div>
    )
}
const mapToStateProps = state => ({
    isAuth: state.auth.isAuthenticated,
    userCart: state.auth.cart,
    userCartDetail: state.auth.userCartWithDetails,
    guestCart: state.cart.cart
})

export default connect(mapToStateProps, {getCartItems, removeItemUser, removeItemGuest})(CartPage)
