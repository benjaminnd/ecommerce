import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Card from '../components/products/productCard';

function Landing() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [Size, setSize] = useState(0)
    useEffect(()=>{
        const filters = {
            skip: Skip,
            limit: Limit
        }
        getProducts(filters)
    }, [])
                      
    useEffect(()=> {
        console.log(Products)
    }, [Products])

    const getProducts = (filters) => {
        const params = new URLSearchParams(filters)
        const url = 'http://localhost:5000/api/product/list?' + params
        console.log('url', url)
        axios.get(url).then(response => {
            if(response.data){
                setProducts(Products.concat(response.data.list ))
                console.log(response.data.size)
                setSize(response.data.size)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    const renderProducts =  Products.map((product, index) => {
        return <Card key={index} title={product.name} price={product.price} description={product.description} images={product.images}/>
    })

    const onLoadMore = ()=> {
        let skip = Skip + Limit
        const filters = {
            skip: skip,
            limit: Limit,
        }
        getProducts(filters)
        setSkip(skip)
    }

    return (
        <div className="w-2/3 mx-auto my-12">
            <div className="text-center">
                <h2 className="font-bold border-b border-gray-200 pb-2">Welcome to Benny's Store <ShoppingCartOutlined/></h2>
            </div>
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {
                        renderProducts
                    }
                </div>
            </div>
            {Size >= Limit && 
            <div className="btn flex justify-center">
                <button className="bg-transparent hover:bg-green-300 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-900 hover:border-transparent rounded focus:outline-none" onClick={onLoadMore}>Load More</button>
            </div>
            }
        </div>
    )
}

export default Landing
