import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Card from '../components/products/productCard';

function Landing() {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/api/product/list').then(response => {
            if(response.data){
                setProducts(response.data.list)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])
                      
    useEffect(()=> {
        console.log(products)
    }, [products])
    const renderProducts =  products.map((product, index) => {
        return <Card title={product.name} price={product.price} description={product.description}/>
    })

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
        </div>
    )
}

export default Landing
