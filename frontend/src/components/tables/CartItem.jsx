import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function CartItem({cart, product, isAuth, renderCartImage, removeItem, handleQuantity}) {
    const userQuantity = useInputForm(product.quant)
    const guestQuantity = useInputForm(product.cartQuant)
    const [UserItemSubTotal, setUserItemSubTotal] = useState(0)
    const [GuestItemSubTotal, setGuestUserItemSubtotal] = useState(0)
    useEffect(() => {
        let newSub = userQuantity.value * product.price
        setUserItemSubTotal(newSub)
    }, [userQuantity])

    useEffect(() => {
        let newSub = guestQuantity.value * product.price
        setGuestUserItemSubtotal(newSub)
    }, [guestQuantity])
    function useInputForm(innitialValue){
        const [quantity, setQuantity] = useState(innitialValue)
        const handleChange = (e)=>{
            setQuantity(e.target.value)
            handleQuantity(product._id, e.target.value)
        }
        return {
            value: quantity,
            onChange: handleChange
        }
    }


    return (
        <tr key={product._id}>
        <td className="">
            <div className="cart-info flex flex-wrap">
                <img alt="product" src={renderCartImage(product.images)} />
                <div>
                    <p className="productName">{product.name}</p>   
                    <small>Price: ${product.price} CAD</small>
                    <br/>
                    <button className="removeBtn"
                    onClick={()=>removeItem(cart, product._id)}
                    >Remove </button>
                </div>
            </div>
        </td> 
        <td>
            {isAuth && <input className="quantInput" type="number" min="1" {...userQuantity} /> }
            {!isAuth && <input className="quantInput" type="number" min="1" {...guestQuantity} /> }
        </td>
        <td>
            ${isAuth && UserItemSubTotal}
            {!isAuth && GuestItemSubTotal} <small>CAD</small>
        </td>
        </tr>
    )
}

export default CartItem
