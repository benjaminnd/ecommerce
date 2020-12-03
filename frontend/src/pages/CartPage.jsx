import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import Paypal from '../components/payment/Paypal';
import CartTable from '../components/tables/CartTable';
import {getCartItems, removeItemUser, onSuccessBuy, changeQuantity} from '../data/reducers/auth'
import {removeItemGuest, onSuccessBuyGuest, guestChangeQuantity} from '../data/reducers/cart'
import URLDevelopment from '../helpers/URL';
import Footer from './Footer';

function CartPage({userCart, getCartItems, removeItemUser, changeQuantity, onSuccessBuy, onSuccessBuyGuest, removeItemGuest, guestChangeQuantity, userCartDetail, guestCart, isAuth}) {
    const [UserCart, setUserCart] = useState([])
    const [GuestCart, setGuestCart] = useState([])
    const [UserTotal, setUserTotal] = useState(0)
    const [GuestTotal, setGuestTotal] = useState(0)
    const [showEmptyUser, setShowEmptyUser] = useState(true)
    const [showEmptyGuest, setShowEmptyGuest] = useState(true)
    useEffect(()=>{
        console.log('guest cart...', guestCart)
        //get cart items from state users
    if (userCart.length > 0) {
        console.log('user cart...', userCart)
        setShowEmptyUser(false)
        getCartItems(userCart)
    }else{
        setShowEmptyUser(true)
        console.log('set empty user')
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
         if(guestCart.length>0) {
            setShowEmptyGuest(false)
            setGuestTotal(guestCart.reduce(totalReducer, 0))
         }else{setShowEmptyGuest(true)} 
    }, [guestCart])

    const handleQuantity = (id, newQuant) => {
        changeQuantity(id, newQuant)
    }

    const guestHandleQuantity = (id, newQuant) => {
        guestChangeQuantity(id, newQuant)
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

        toast.warning('Errors occurs while paying. Please try again')

    }

    const transactionCanceled = () => {

        toast.info('payment canceled')

    }

    return (
        <>
        <div className="w-5/6 m-12 m-auto">
            <div className=""><h1 className="font-bold text-xl pb-2 my-6">Cart Items</h1></div>
            <div>
                { !isAuth && showEmptyGuest && <p className="italic">No items to show</p>}
                { isAuth && showEmptyUser && <p className="italic">No items to show</p>}
                { isAuth && userCart.length > 0  && <CartTable cart={userCartDetail} removeItem={removeItemUser} handleQuantity={handleQuantity} isAuth={isAuth}/>}
                { !isAuth && guestCart.length > 0  && <CartTable cart={guestCart} removeItem={removeItemGuest} isAuth={isAuth} handleQuantity={guestHandleQuantity}/>}
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
                    onError={transactionError}
                    onCancel={transactionCanceled}/>
                }
        </div>
        <Footer/>
        </>
    )
}
const mapToStateProps = state => ({
    isAuth: state.auth.isAuthenticated,
    userCart: state.auth.cart,
    userCartDetail: state.auth.userCartWithDetails,
    guestCart: state.cart.cart
})

export default connect(mapToStateProps, {getCartItems, removeItemUser, changeQuantity, removeItemGuest, guestChangeQuantity, onSuccessBuyGuest, onSuccessBuy})(CartPage)
