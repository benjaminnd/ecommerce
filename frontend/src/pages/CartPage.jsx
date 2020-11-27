import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import Paypal from '../components/payment/Paypal';
import CartTable from '../components/tables/CartTable';
import {getCartItems, removeItemUser, onSuccessBuy, changeQuantity} from '../data/reducers/auth'
import {removeItemGuest, onSuccessBuyGuest} from '../data/reducers/cart'
import URLDevelopment from '../helpers/URL';

function CartPage({userCart, getCartItems, removeItemUser, changeQuantity, onSuccessBuy, onSuccessBuyGuest, removeItemGuest, userCartDetail, guestCart, isAuth}) {
    const [UserCart, setUserCart] = useState([])
    const [GuestCart, setGuestCart] = useState([])
    const [UserTotal, setUserTotal] = useState(0)
    const [GuestTotal, setGuestTotal] = useState(0)
    useEffect(()=>{
        console.log('guest cart...', guestCart)
        //get cart items from state users
    if (userCart.length > 0) {
        console.log('user cart...', userCart)
     getCartItems(userCart)
    } 
    },[userCart])

    useEffect(() => {
        setUserCart(userCartDetail)
        const totalReducer = (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quant
        if(userCartDetail) setUserTotal(userCartDetail.reduce(totalReducer, 0))
    }, [userCartDetail])

    useEffect(() => {
        setGuestCart(guestCart)
        const totalReducer = (accumulator, currentValue) => accumulator + currentValue.price * currentValue.cartQuant
         if(guestCart) setGuestTotal(guestCart.reduce(totalReducer, 0))
    }, [guestCart])

    const handleQuantity = (id, newQuant) => {
        changeQuantity(id, newQuant)
    }
    const transactionSuccess = (data) => {
        let payment = {
            cartDetail: UserCart, paymentData: data
        }

        axios.post(`${URLDevelopment}/api/user/successPay`, payment).then(response=> {
            if(response.data.success){
                toast.success('Payment successfully received')
                onSuccessBuy({cart: response.data.cart, updatedCart: response.data.updatedCart})
            }else{
                toast.error(response.data.error)
            }
        })
    }

    const guestTransactionSuccess = (data) => {
        console.log('Guest payment')
        let payment = {
            cartDetail: GuestCart, paymentData: data
        }
        console.log('payment details', payment )

        axios.post(`${URLDevelopment}/api/user/successPayGuest`, payment).then(response=> {
            if(response.data.success){
                toast.success('Payment successfully received')
                onSuccessBuyGuest({updatedCart: response.data.updatedCart})
            }else{
                toast.error(response.data.error)
            }
        })
    }

    const transactionError = () => {

        console.log('Paypal Error')

    }

    const transactionCanceled = () => {

        console.log('Paypal Error')

    }

    return (
        <div className="w-5/6 m-12 m-auto">
            <div className=""><h1 className="font-bold text-xl pb-2 my-6">Cart Items</h1></div>
            <div>
                {userCart.length <= 0 &&  guestCart.length <=0 && <p className="italic">No items to show</p>}
                { isAuth && userCart.length > 0  && <CartTable cart={userCartDetail} removeItem={removeItemUser} handleQuantity={handleQuantity} isAuth={isAuth}/>}
                { !isAuth && guestCart.length > 0  && <CartTable cart={guestCart} removeItem={removeItemGuest} isAuth={isAuth}/>}
            </div>
            <div>
                <span className="flex">
                    {
                        isAuth && userCart.length > 0 &&
                        <>
                        <p>Total: </p>
                        <p className="font-bold ml-3">{UserTotal} $</p>
                        </>
                    }
                    {
                        !isAuth && guestCart.length > 0 &&
                        <>
                        <p>Total: </p>
                        <p className="font-bold ml-3">{GuestTotal}$</p>
                        </>
                    }
                </span>
            </div>
            {/* Paypal button */}
                {isAuth && userCart.length > 0 &&
                <Paypal
                    total = {UserTotal}
                    onSuccess={transactionSuccess}
                    transactionError={transactionError}/>
                }

                {!isAuth && guestCart.length > 0 && 
                <Paypal
                    total={GuestTotal}
                    onSuccess={guestTransactionSuccess}
                    transactionError={transactionError}/>
                }
        </div>
    )
}
const mapToStateProps = state => ({
    isAuth: state.auth.isAuthenticated,
    userCart: state.auth.cart,
    userCartDetail: state.auth.userCartWithDetails,
    guestCart: state.cart.cart
})

export default connect(mapToStateProps, {getCartItems, removeItemUser, changeQuantity, removeItemGuest, onSuccessBuyGuest, onSuccessBuy})(CartPage)
