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
        <div>
           <Descriptions title="Product Info">
                <Descriptions.Item label="Price"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="View"> {Product.views + 1}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="rounded-full bg-red-700 hover:bg-red-400 py-2 px-4 text-white font-bold focus:outline-none" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductInfo
