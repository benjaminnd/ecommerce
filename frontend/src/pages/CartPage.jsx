import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {getCartItems} from '../data/reducers/auth'

function CartPage({user, getCartItems, cart}) {
    const [Cart, setCart] = useState([])
    let userCart;
    useEffect(()=>{
        //get cart items from state users
    if (user) {
    userCart = user.cart.slice(0)
    console.log(userCart)
    getCartItems(userCart, user.cart)
    } 
    },[user])

    return (
        <div>
        </div>
    )
}
const mapToStateProps = state => ({
    user: state.auth.user
})

export default connect(mapToStateProps, {getCartItems})(CartPage)
