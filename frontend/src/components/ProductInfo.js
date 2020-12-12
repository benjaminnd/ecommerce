import React, {useState, useEffect} from 'react'
import {Descriptions} from 'antd'

function ProductInfo({product, addToCart}) {
    const [Product, setProduct] = useState({})

    useEffect(()=>{
        setProduct(product)
    }, [[product]])
    
    const handleAddToCart = () => {
        addToCart(Product._id)
    }
    return (
        <>
            <h1>{Product.name}</h1>
            <p><span className="font-bold">Description </span> : {Product.description}</p>
            <h4> Price: ${Product.price}</h4>
            <small>Viewed: {Product.views + 1}</small>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="rounded-full bg-red-700 hover:bg-red-400 py-2 px-4 text-white font-bold focus:outline-none" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </>
    )
}

export default ProductInfo
