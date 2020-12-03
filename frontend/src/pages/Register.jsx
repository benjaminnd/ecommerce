import React from 'react';
import { useState } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {toast} from 'react-toastify';
import Button from '../components/buttons/button.component';
import Container from '../components/containers/container.component';
import FormInput from '../components/inputs/input.component';
import {register} from '../data/reducers/auth';
import Footer from './Footer';
import './spinner.css';

const Register= ({register, isAuth, isLoading, user}) => {
    //Register form state
    const [userdata, setUserdata] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const {name, email, password, confirmPassword} = userdata;

    //onChange event 
    const handleChange = (name) => e => {
        setUserdata({...userdata, [name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('submit')
        if(password !== confirmPassword) {
            toast.error('Password do not match');
        } else {
            register({name, email, password})
        }
    }

    if(isAuth && user) {
        console.log(user);
        const {name, role} = user
        toast.success(`Welcome ${name}`);
        return (role===0 ? (<Redirect to='/dashboard/user'/>): (<Redirect to='/dashboard/admin'/>));
    } 

    return (
        <>
        <div className="flex justify-center">
            <form className="bg-white rounded-lg overflow-hidden shadow-2xl p-5 my-16 w-1/2"  onSubmit={onSubmit}>
            <h2 className="font-bold text-3xl text-center mb-5">Register</h2>
            <FormInput
                title='Name' 
                placeholder='Your Name'
                value={name}
                handleChange={handleChange('name')}
                type='text'
            />
            <FormInput
                title='Email' 
                placeholder='benjamin@gmail.com'
                value={email}
                handleChange={handleChange('email')}
                type='text'
            />
            <FormInput
                title='Password' 
                placeholder='Password - 8 or more characters'
                value={password}
                handleChange={handleChange('password')}
                type='text'
            />
            <FormInput
                title='Confirm Password' 
                placeholder='Confirm Password'
                value={confirmPassword}
                handleChange={handleChange('confirmPassword')}
                type='text'
            />
            <div className="flex justify-center">


            {isLoading ? (<div className="lds-ellipsis object-center"><div></div><div></div><div></div><div></div></div>) :
            (<Button isButton = {true} title='Signup' addStyle='bg-primary text-white w-full mb-3' action={onSubmit} type='submit'/>)
            }
            
            </div>
            
            <div className="flex justify-end w-full">
                <Button isButton={false} title='Already signed up?' href='/login' addStyle='text-sm italic text-gray-600'></Button>
            </div>
            </form>
        </div>
        <Footer />
        </>
    )
}

const mapToStateProps = state => ({
    isAuth: state.auth.isAuthenticated,
    isLoading: state.auth.loading,
    user: state.auth.user
})

export default connect(mapToStateProps, {register})(Register);