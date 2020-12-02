import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function CartItem({cart, product, isAuth, renderCartImage, removeItem, handleQuantity}) {
    const userQuantity = useInputForm(product.quant)
    let guestQuantity = useInputForm(product.cartQuant)
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
        <td className="flex items-center">
            <img style={{ width: '70px' }} alt="product" 
            src={renderCartImage(product.images)} />
            <p>{product.name}</p>
        </td> 
        <td>
            {isAuth && <input type="number" min="1" {...userQuantity} /> }
            {!isAuth && <input type="number" min="1" {...guestQuantity} /> }
                EA
            </td>
        <td>$ {product.price} </td>
        <td><button 
            onClick={()=>removeItem(cart, product._id)}
            >Remove </button> </td>
        </tr>
    )
}

export default CartItem
