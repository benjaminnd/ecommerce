import axios from 'axios'
import {toast} from 'react-toastify'
import URLProduction from '../../helpers/URL'
import serverURL from '../../helpers/URL';
import C from '../cartConstants';

//Initial State

const initialState = {
    cart: [], //cart of items that is stored separatedly regardless of item id
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case C.ADD_ITEM:
            console.log('item added to cart');
            //search if item is already in cart
            let found = state.cart.findIndex((item, index)=>{
                return item._id === payload._id
            })
            //console.log(found)
            if(found >= 0){
                state.cart[found].cartQuant += 1
                let tempCart = JSON.stringify([...state.cart])
                localStorage.setItem('tempCart', tempCart)
                return {
                    cart: [...state.cart]
                }
            }else{
                let tempCart = JSON.stringify([...state.cart, payload])
                localStorage.setItem('tempCart', tempCart)
                return {
                    cart: [...state.cart, payload]
                }
            }

        case C.LOAD_CART:
        case C.EMPTY_CART:
        case C.REMOVE_ITEM:
        case C.GUEST_SUCCESS_PAY:
        case C.GUEST_CHANGE_QUANTITY:
            return  {
                cart: payload
            }
            
        default: return state
    }
}

//load stored cart from local storage
export const loadCart = () => (dispatch) => {
    try{
        console.log('load cart from local storage')
        //get cart array from local storage
        const localCart = JSON.parse(localStorage.getItem('tempCart') || "[]")
        dispatch({
            type: C.LOAD_CART,
            payload: localCart
        })

    }catch(error) {
        console.log(error.response)
    }
}

export const emptyCart = () => (dispatch) => {
    try{
        console.log('load cart from local storage')
        let emptyCart = []
        //empty cart arrays from local storage
        localStorage.setItem('tempCart', JSON.stringify(emptyCart))
        dispatch({
            type: C.EMPTY_CART,
            payload: emptyCart
        }) 
    }catch(error) {
        console.log(error.response)
    }
}
//add item to guest cart
export const addToCart = (id) => async(dispatch) => {
    try{
        console.log('adding to cart.....')
        const request = axios.get(`${serverURL}/api/product/${id}`)
        .then(response=>{
            console.log(response.data)
            response.data.cartQuant = 1
            dispatch({
                type: C.ADD_ITEM,
                payload: response.data
            })
        });

    }catch(error) {
        console.log(error.response)
    }
}
//remove item from guest cart
export const removeItemGuest = (cart, id) => async(dispatch) => {
    const cartAfterRemoved = cart.filter(item=>item._id !== id)
    console.log(cartAfterRemoved)
    localStorage.setItem('tempCart', JSON.stringify(cartAfterRemoved))
    dispatch({
        type: C.REMOVE_ITEM,
        payload: cartAfterRemoved
    })

}

export const guestChangeQuantity = (_id, newQuant) => dispatch => {
    const tempCart = JSON.parse(localStorage.getItem('tempCart') || '[]')
    const indexToChange = tempCart.findIndex(item=>item._id=_id)
    tempCart[indexToChange].cartQuant = (+ newQuant)
    localStorage.setItem('tempCart', JSON.stringify(tempCart))
    dispatch({
        type: C.GUEST_CHANGE_QUANTITY,
        payload: tempCart
    })
}

export const onSuccessBuyGuest = (data) => dispatch => {
    localStorage.setItem('tempCart', JSON.stringify(data.updatedCart))
    dispatch({
        type: C.GUEST_SUCCESS_PAY,
        payload: data.updatedCart
    })
}