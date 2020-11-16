import axios from 'axios'
import {toast} from 'react-toastify'
import setAuthToken from '../../helpers/setAuthToken'
import URLDevelopment from '../../helpers/URL'
import C from '../authConstants';




//Initial State

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    cart: []
}

//Reducers
export default function(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case C.USER_LOADED:
            console.log('user loaded');
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false,
                cart: payload.cart
            }
        case C.REGISTER_SUCCESS:
        case C.LOGIN_SUCCESS:
            //set token in localstorage
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        
        case C.LOADING:
            return {
                ...state,
                loading: true

            };

        case C.LOGOUT:
        case C.AUTH_ERROR:
        case C.REGISTER_FAIL:
        case C.LOGIN_FAIL:
            //set token in localstorage
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user:null
            };
        case C.USER_ADD_TO_CART:
            return {
                ...state
            }
        case C.USER_RETRIEVE_CART:
            return {
                ...state,
                userCart: payload
            }
        default: 
            return state;
    }
}

//Actions
//initially load user
export const loadUser = () => async (dispatch) => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const response = await axios.get(`${URLDevelopment}/api/user`);
        console.log('getting user')
        dispatch({
            type:C.USER_LOADED,
            payload: response.data

        })
    } catch(error){
        console.log('No user to load', error.response);
        dispatch({
            type: C.AUTH_ERROR
        })
    }
}
export const register = ({name, email, password}) => async(dispatch) => {
    //header for axios
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    //body
    const body = JSON.stringify({name,email,password});
    console.log('registering' , body);
    dispatch({
        type: C.LOADING
    })
    try {
        const res = await axios.post(`${URLDevelopment}/api/user/register`, body, config)

        dispatch({
            type:C.REGISTER_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser());

    }catch(error){
        console.log(body,error.response);
        const errs = error.response.data.errors;
        if(errs) {
            errs.map(er => {
                toast.error(er.msg);
            })
        }

        dispatch({
            type: C.REGISTER_FAIL
        })
    }
}
export const login = ({email, password}) => async(dispatch) => {
    //header for axios
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    //body
    const body = JSON.stringify({email,password});
    console.log('loggin in' , body);
    dispatch({
        type: C.LOADING
    })
    try {
        const res = await axios.post(`${URLDevelopment}/api/user/login`, body, config)

        dispatch({
            type:C.LOGIN_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser());

    }catch(error){
        console.log(body,error.response);
        //get error from server and display in toast container
        const errs = error.response.data.errors;
        if(errs) {
            errs.map(er => {
                toast.error(er.msg);
            })
        }

        dispatch({
            type: C.LOGIN_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch ({
        type: C.LOGOUT
    })
}

export const addToCartUser = (_id) => {
    console.log('adding to cart.....')
    const request = axios.post(`${URLDevelopment}/api/user/addToCart?productId=${_id}`)
    .then(response=>response.data);
    console.log(request)
    return {
        type: C.USER_ADD_TO_CART,
        payload: request
    }
}   

export const getCartItems = (cartItems, userCart) => dispatch => {
    let ids = cartItems.map((item)=>item.productId)
    console.log('cart items', cartItems)
    console.log(ids)

    const request = axios.post(`${URLDevelopment}/api/product/getCartItems?cartItems=${ids}`)
    .then(response=>{
        let cartToRender = response.data
        cartToRender.forEach((item,index) => {
            userCart.forEach(u => {
                if(item._id === u.productId) {
                    cartToRender[index].quantityCart = u.quantity;
                }
            });
        });
        console.log('cart to render ', cartToRender)
        dispatch ({
            type: C.USER_RETRIEVE_CART,
            payload: cartToRender
        })
    });
    
}   
