import React from 'react'
import { useState } from 'react'
import product from '../../data/reducers/product'
import URLDevelopment from '../../helpers/URL'
import CartItem from './CartItem'

function CartTable({cart, removeItem, handleQuantity, isAuth}) {
    const renderCartImage = (images) => {
        console.log('cart', cart)
        if(images && images.length > 0) {
            let image = images[0]
            return `${URLDevelopment}/${image}`
        }
    }

    function useInputForm(initialValue){
        const [quantity, setQuantity] = useState(initialValue)

        function handleChange(e){
            setQuantity(e.target.value)
        }

        return {
            quantity,
            onChange: handleChange
        }
    }
    

    const renderItems = () => (
        cart && cart.map(product => (
            <CartItem  key={product._id} cart={cart} product={product} isAuth={isAuth} removeItem={removeItem} renderCartImage={renderCartImage} handleQuantity={handleQuantity} />
        ))
    )

    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                    <th>Remove from Cart</th>
                </tr>
            </thead>
            <tbody>
                {renderItems()}
            </tbody>
        </table>
    </div>
    )
}


export default CartTable
