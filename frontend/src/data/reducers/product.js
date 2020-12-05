import axios from 'axios'
import {toast} from 'react-toastify'
import URLProduction from '../../helpers/URL'
import C from '../productConstants';
// import {useHistory} from 'react-router-dom'

// let history = useHistory();
//Initial State
const initialState = {
    products: [],
    productTypes: [{_id: 'iphone', name: 'iphone'}, {_id: 'airpod', name: 'airpod'}],
    productUploaded: false //flag of successful upload and when the application should be redirected to homepage
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
            console.log('products loaded')
            return {
                ...state,
                products: payload,
                productUploaded: false
            }
        case C.FINISH_UPLOAD:
            return {
                ...state,
                productUploaded: false
            }
        default: return state
    }
}


export const finishUpload = ()=> async(dispatch) => {
    console.log('Finishing uploading ....')
    dispatch({
        type: C.FINISH_UPLOAD
    })

}

//load all products from form
export const loadProducts = () => dispatch => {
    console.log('loading products from the store')
    axios.get(`${URLProduction}/api/product/all`).then(response=>{
        if(response.data.success){
            console.log('response getting product', response)
            dispatch({
                type: C.PRODUCTS_LOADED,
                payload: response.data.list
            })
        }else{
            toast.error(response.data.err)
        }
})
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
    console.log('product upload data', product.images);
    try {
        const res = await axios.post(`${URLProduction}/api/product/`, bodyFormData, config)
        if(res.data.success){
            toast.success(res.data.msg);
            console.log('adding product...', res.data)
            dispatch({
                type: C.ADD_PRODUCTS_SUCCESS
            })
        }
    }catch(error){
        // toast.error(error.response.data.error)
        console.log(error.response)
    }
}
