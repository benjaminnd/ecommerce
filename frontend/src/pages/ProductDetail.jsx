import Axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import URLDevelopment from '../helpers/URL'
import ProductImage from '../components/imageGallery/ProductImage'
import ProductInfo from '../components/ProductInfo'

function ProductDetail(props) {
    const [Product, setProduct] = useState({});
    const productId = props.match.params.productId
    let product
    useEffect(() => {
        axios.get(`${URLDevelopment}/api/product/${productId}`).then(response=>{
            setProduct(response.data)
        })
    }, [])
    return (
        <div className="py-12 sm:px-16">
            <div className="flex justify-center mb-12">
                <h1 className="font-bold pb-2">{Product.name}</h1>
            </div>

            <div className="flex flex-wrap">
                <div className="w-full sm:w-1/2">
                    <ProductImage product={Product}/>
                </div>   
                <div className="w-full sm:w-1/2">
                    <ProductInfo product={Product}/>
                </div>   
            </div>
        </div>
    )
}

export default ProductDetail
