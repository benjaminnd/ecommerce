import axios from 'axios'
import {toast} from 'react-toastify'
import URLDevelopment from '../../helpers/URL'
import C from '../productConstants';
// import {useHistory} from 'react-router-dom'

// let history = useHistory();
//Initial State
const initialState = {
    products: [],
    productUploaded: false
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case C.ADD_PRODUCTS_SUCCESS:
            return {
                ...state,
                productUploaded: true
            }
        case C.PRODUCTS_LOADED:
            return {
                ...state,
                products: [...payload],
            }
        default: return state
    }
}

//load all products from form
export const loadProducts = async(dispatch) => {
    try {
        const res = await axios.get(`${URLDevelopment}/api/product/list`)
        console.log('loading products from the store')
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
        if(res.data.success){
            toast.success(res.data.msg);
            console.log('adding product...', res.data)
            dispatch({
                type: C.ADD_PRODUCTS_SUCCESS
            })
            dispatch(loadProducts())
        }
    }catch(error){
        toast.error(error.response.data.error)
        console.log(error.response)
    }
}