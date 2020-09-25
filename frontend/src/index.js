import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css';
import{BrowserRouter, Switch, Route} from 'react-router-dom'

//import redux
import {Provider} from 'react-redux';
import store from './data/store';
//import components
import Navbar from './components/navbar/navbar.component'
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Navbar></Navbar>
            <Switch>
                <Route exact path="/" component={App}></Route>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);