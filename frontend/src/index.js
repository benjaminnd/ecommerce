import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css';
import 'react-toastify/dist/ReactToastify.css';
import{BrowserRouter, Switch, Route} from 'react-router-dom'

//import redux
import {Provider} from 'react-redux';
import store from './data/store';
//import components
import Navbar from './components/navbar/navbar.component'
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
ReactDOM.render(
    <App/>,
    document.getElementById("root")
);