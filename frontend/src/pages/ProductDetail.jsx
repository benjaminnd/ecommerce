 import Axios from 'axios'
import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import URLProduction from '../helpers/URL'
import ProductImage from '../components/imageGallery/ProductImage'
import ProductInfo from '../components/ProductInfo'
import '../../src/assets/index.css'
import {connect, useDispatch} from 'react-redux'
import {addToCartUser} from '../data/reducers/auth'
import { addToCart } from '../data/reducers/cart'
function ProductDetail({isAuth}) {
    const param = useParams()
    const dispatch = useDispatch();
    const [Product, setProduct] = useState({});
    const productId = param.productId
    useEffect(() => {
        axios.get(`${URLProduction}/api/product/${productId}`).then(response=>{
            setProduct(response.data)
        })
    }, [])

    const handleAddToCart = (id) => {
        console.log(id)
        if(isAuth){
            dispatch(addToCartUser(id))
        }else{
            dispatch(addToCart(id))
        }
    }
    return (
        <div className="py-12 sm:px-16">
            <div className="flex justify-center mb-12">
                <h1 className="font-bold pb-2">{Product.name}</h1>
            </div>

            <div className="flex flex-wrap">
                <div className="w-full sm:w-1/3 mb-4 p-3">
                    <ProductImage product={Product}/>
                </div>   
                <div className="w-full sm:w-2/3 mb-4 p-3">
                    <ProductInfo product={Product} addToCart={handleAddToCart}/>
                </div>   
            </div>
        </div>
    )
}

const mapToStateProps = state => ({
    isAuth: state.auth.isAuthenticated
})


export default connect(mapToStateProps)(ProductDetail)
