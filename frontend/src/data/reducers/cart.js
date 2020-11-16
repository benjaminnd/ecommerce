import axios from 'axios'
import {toast} from 'react-toastify'
import URLDevelopment from '../../helpers/URL'
import C from '../cartConstants';

//Initial State

const initialState = {
    cart: [], //cart of items that is stored separatedly regardless of item id
    total: [] // sum of cart items based on ids
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case C.ADD_ITEM:
            console.log('item added to cart');
            //store array of all single cart items to the local storage
            let tempCart = JSON.stringify([...state.cart, payload])
            localStorage.setItem('tempCart', tempCart)
            //search if item is already in cart
            let found = state.total.findIndex((item, index)=>{
                return item._id === payload._id
            })
            console.log(found)
            if(found >= 0){
                state.total[found].quant += 1
                //store array of unique id cart item to the local storage
                let tempTotalCart = JSON.stringify([...state.total])
                localStorage.setItem('tempTotalCart', tempTotalCart)
                return {
                    cart: [...state.cart, payload],
                    //if item is found then increment the quantity of the item
                    total: [...state.total]
                }
            }else{
                let tempTotalCart = JSON.stringify([...state.total, payload])
                localStorage.setItem('tempTotalCart', tempTotalCart)
                return {
                    cart: [...state.cart, payload],
                    total: [...state.total, payload]
                }
            }

        case C.LOAD_CART:
            return  payload
            
        default: return state
    }
}

//load stored cart from local storage
export const loadCart = () => (dispatch) => {
    try{
        console.log('load cart from local storage')
        let loadedCartState = {
            cart: [],
            total: []
        }
        //get cart array from local storage
        const localCart = JSON.parse(localStorage.getItem('tempCart') || "[]")
        const localTempCart = JSON.parse(localStorage.getItem('tempTotalCart') || "[]")
        if(localCart) {
            loadedCartState.cart = localCart
        }
        if(localTempCart) {
            loadedCartState.total = localTempCart
        }

        dispatch({
            type: C.LOAD_CART,
            payload: loadedCartState
        })

    }catch(error) {
        console.log(error.response)
    }
}

export const emptyCart = () => (dispatch) => {
    try{
        console.log('load cart from local storage')
        let emptyCartState = {
            cart: [],
            total: []
        }
        //empty cart arrays from local storage
        localStorage.setItem('tempCart', JSON.stringify(emptyCartState.cart))
        localStorage.setItem('tempTotalCart', JSON.stringify(emptyCartState.total))
        dispatch({
            type: C.LOAD_CART,
            payload: emptyCartState
        })

    }catch(error) {
        console.log(error.response)
    }
}
//add item to temp cart
export const addToCart = (id) => async(dispatch) => {
    try{
        console.log('adding to cart.....')
        const request = axios.get(`${URLDevelopment}/api/product/${id}`)
        .then(response=>{
            console.log(response.data)
            response.data.quant = 1
            dispatch( {
                type: C.ADD_ITEM,
                payload: response.data
            })
        });

    }catch(error) {
        console.log(error.response)
    }
}