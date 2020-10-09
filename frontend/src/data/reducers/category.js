import axios from 'axios'
import {toast} from 'react-toastify'
import URLDevelopment from '../../helpers/URL'
import C from '../categoryConstants';

//Initial State

const initialState = {
    categories: []
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case C.CATEGORY_LOADED:
            console.log('categories loaded');
            return {
                categories: [...state.categories, ...payload]
            }
        default: return state
    }
}
//load all products from form
export const loadCategories = async(dispatch) => {
    try{
        const response = await axios.get(`${URLDevelopment}/api/category/all`)
        console.log('getting categories')
        dispatch({
            type: C.CATEGORY_LOADED,
            payload: response.data
        })
    }catch(error) {
        console.log(error.response)
    }
}