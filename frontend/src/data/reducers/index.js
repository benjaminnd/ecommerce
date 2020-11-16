//combineReducer
import {combineReducers} from 'redux'
import auth from './auth'
import product from  './product'
import category from './category'
import cart from './cart'
export default combineReducers({
    auth,
    product,
    category,
    cart
});