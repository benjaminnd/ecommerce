import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { loadUser } from './data/reducers/auth';
import { loadCategories } from './data/reducers/category';
import { loadProducts } from './data/reducers/product';
import store from './data/store';
import setAuthToken from './helpers/setAuthToken';
import Routes from './routes';
import 'antd/dist/antd.css'
import { loadCart, emptyCart } from './data/reducers/cart';

if(localStorage.token) {
    setAuthToken(localStorage.token)
}
function App() {
    store.subscribe(()=> {
        console.log(store.getState());
    })
    useEffect(()=> {
        console.log('Loading state')
        //store.dispatch(emptyCart())
        store.dispatch(loadCart())
        store.dispatch(loadUser())
        store.dispatch(loadProducts())
        store.dispatch(loadCategories)
    }, []);
    return (
    <Provider store={store}>
        <Routes/>
    </Provider>   
    )
}

export default App;