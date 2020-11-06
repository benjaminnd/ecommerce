import React, {useState, useEffect} from 'react'
import {Descriptions} from 'antd'

function ProductInfo({product}) {
    const [Product, setProduct] = useState({})

    useEffect(()=>{
        setProduct(product)
    }, [[product]])
    
    return (
        <div>
           <Descriptions title="Product Info">
                <Descriptions.Item label="Price"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="View"> {Product.views}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* <button size="large" shape="round" type="danger"
                    onClick={addToCarthandler}
                >
                    Add to Cart
                </button> */}
            </div>
        </div>
    )
}

export default ProductInfo
