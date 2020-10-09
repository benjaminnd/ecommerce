import axios from 'axios'
import {toast} from 'react-toastify'
import URLDevelopment from '../../helpers/URL'
import C from '../productConstants';

//Initial State

const initialState = {
    products: []
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case C.ADD_PRODUCTS_SUCCESS:
            return {
                products: [...state.products, ...payload]
            }
        case C.PRODUCTS_LOADED:
            return {
                products: [...payload]
            }
        default: return state
    }
}
//load all products from form
export const loadProducts = async(dispatch) => {
    try {
        const res = await axios.get(`${URLDevelopment}/api/product/list`)
        console.log('loading products to the store')
        dispatch({
            type: C.PRODUCTS_LOADED,
            payload: res.data
        })
    }catch(error){
        console.log(error.response)
    }
}