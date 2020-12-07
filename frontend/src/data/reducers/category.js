import axios from 'axios'
import {toast} from 'react-toastify'
import URLProduction from '../../helpers/URL'
import serverURL from '../../helpers/URL';
import C from '../categoryConstants';

//Initial State

const initialState = {
    categories: [],
    currentShow: "all"
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case C.CATEGORY_LOADED:
            console.log('categories loaded');
            return {
                ...state, 
                categories: [...state.categories, ...payload]
            }
        case C.CHANGE_SHOW: 
            return {
                ...state,
                currentShow: payload
            }
        default: return state
    }
}
//load all products from form
export const loadCategories = async(dispatch) => {
    try{
        const response = await axios.get(`${serverURL}/api/category/all`)
        console.log('getting categories')
        dispatch({
            type: C.CATEGORY_LOADED,
            payload: response.data
        })
    }catch(error) {
        console.log(error.response)
    }
}


export const changeShow = data => dispatch => {
    console.log('Change show to ', data)
    dispatch({
        type: C.CHANGE_SHOW,
        payload: data
    })
}