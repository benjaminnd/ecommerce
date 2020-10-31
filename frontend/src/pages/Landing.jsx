import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Card from '../components/products/productCard';
import CheckBox from '../components/filters/CheckBox';
import RadioBox from '../components/filters/RadioBox';
import price from '../assets/price';
import SearchBar from '../components/filters/SearchBar';

function Landing() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [Size, setSize] = useState(0)
    const [SearchText, setSearchText] = useState('')
    const [Filters, setFilters] = useState({
        category: [],
        price: []
    })
    useEffect(()=>{
        const params = {
            skip: Skip,
            limit: Limit
        }
        getProducts(params)
    }, [])
                      
    useEffect(()=> {
        console.log(Products)
    }, [Products])

    const getProducts = (filters) => {
        console.log('Filters: ', filters)
        // const params = new URLSearchParams(filters)
        const url = 'http://localhost:5000/api/product/list'
        // console.log('url', url)
        axios.post(url, filters).then(response => {
            if(response.data){
                if(filters.loadMore) {
                    setProducts(Products.concat(response.data.list ))
                }else{
                    setProducts(response.data.list)
                }
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
        const params = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(params)
        setSkip(skip)
    }


    const showFilteredProducts = (filters) => {
        const params = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(params)
        setSkip(0)
    }

    const handleFilters = (filters, name) =>{
        console.log('name', name)
        console.log('filters ',filters)
        const newFilters = {...Filters}
        newFilters[name] = filters
        
        //Getting price from data
        if(name === 'price') {
            newFilters[name] = filters ? price[filters].range : [0]
        }
        console.log('New filters', newFilters)

        setFilters(newFilters)
        showFilteredProducts(newFilters)
    }

    const handleSearch = (searchText) => {
        setSearchText(searchText)
        const params = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchText: searchText 
        }
        setSkip(0)

        getProducts(params)
    }

    return (
        <div className="w-2/3 mx-auto my-12">
            <div className="text-center">
                <h2 className="font-bold border-b border-gray-200 pb-2">Welcome to Benny's Store <ShoppingCartOutlined/></h2>
            </div>
            <div className="mb-4 flex -mx-2">
                <div className="w-1/2 px-2">
                     <CheckBox handleFilters={filters=>handleFilters(filters, "category")}/>
                </div>
                <div className="w-1/2 px-2">
                    <RadioBox handleFilters={filters=>handleFilters(filters, "price")}/>
                </div>
            </div>
            <div className="mb-4 flex -mx-2 justify-end">
                    <SearchBar handleSearch={handleSearch}/>
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
