import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/navbar.component';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const Routes = () => {
    return (
        <BrowserRouter>
        <Navbar></Navbar>
        <ToastContainer />
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
        </Switch>
    </BrowserRouter>
    );
};

export default Routes;