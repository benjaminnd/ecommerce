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
        // case C.ADD_PRODUCTS_SUCCESS:
        //     return {
        //         products: [...state.products, ...payload]
        //     }
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

export const addProduct = (product) => async(dispatch) => {
    //header for axios
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    const bodyFormData = new FormData()
    Object.keys(product).forEach((key) => {
        bodyFormData.append(key, product[key] )
    })
    console.log(FormData);
    try {
        const res = await axios.post(`${URLDevelopment}/api/product/`, bodyFormData, config)
        toast.success(res.data);
        console.log('adding product...', res.data)
        dispatch(loadProducts())
    }catch(error){
        // toast.error(error.response.data)
        console.log(error.response)
    }
}