import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/navbar.component';
import CartPage from './pages/CartPage';
import HistoryPage from './pages/HistoryPage';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import UploadProduct from './pages/UploadProduct';

const Routes = () => {
    return (
            <BrowserRouter>
                <Navbar></Navbar>
                <ToastContainer />
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/register" component={Register}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/shop" component={Landing}></Route>
                    <Route exact path="/upload" component={UploadProduct}></Route>
                    <Route exact path="/product/:productId" component={ProductDetail}></Route>
                    <Route exact path="/user/cart" component={CartPage}></Route>
                    <Route exact path="/user/history" component={HistoryPage}></Route>
                </Switch>
            </BrowserRouter>
    );
};

export default Routes;