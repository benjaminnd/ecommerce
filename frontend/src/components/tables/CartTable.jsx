import React from 'react'

function CartTable({cart, removeItem, isAuth}) {
    const renderCartImage = (images) => {
        console.log('cart', cart)
        if(images && images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        cart && cart.map(product => (
            <tr key={product._id}>
                <td className="flex items-center">
                    <img style={{ width: '70px' }} alt="product" 
                    src={renderCartImage(product.images)} />
                    <p>{product.name}</p>
                </td> 
                <td>{isAuth ? product.quant : product.cartQuant} EA</td>
                <td>$ {product.price} </td>
                <td><button 
                onClick={()=>removeItem(cart, product._id)}
                >Remove </button> </td>
            </tr>
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
