import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Card from '../components/products/productCard';
import CheckBox from '../components/filters/CheckBox';
import RadioBox from '../components/filters/RadioBox';
import price from '../assets/price';
import SearchBar from '../components/filters/SearchBar';
import Button from '../components/buttons/button.component';
import { changeShow } from '../data/reducers/category';
import {connect, useDispatch} from 'react-redux'
import Footer from './Footer';
import URLProduction from '../helpers/URL';
import serverURL from '../helpers/URL';


function Landing({toShow, changeShow}) {
    const dispatch = useDispatch()
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [Size, setSize] = useState(0)
    const [SearchText, setSearchText] = useState('')
    const [Filters, setFilters] = useState({
        category: [],
        price: []
    })
    
    //get all products
    useEffect(()=>{
        const params = {
            skip: Skip,
            limit: Limit
        }
        getProducts(params, toShow)
    }, [toShow])
                      
    useEffect(()=> {
        console.log(Products)
    }, [Products])

    const isActive = (showData) => {
        return showData == toShow ? 'bg-primary' : ''
    }
    const getProducts = (filters, show) => {
        const newFilters = {
            ...filters,
            toShow: show
        }
        console.log('Filters: ', newFilters)
        // const params = new URLSearchParams(filters)
        const url = `${serverURL}/api/product/list`
        // console.log('url', url)
        axios.post(url, newFilters).then(response => {
            if(response.data){
                if(filters.loadMore) {
                    //when loadMore button is clicked concatenate the result array into the current products
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
    
    
    
    const showFilteredProducts = (filters) => {
        const params = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(params, toShow)
        setSkip(0)
    }
    const handleLoadmore = ()=> {
        let skip = Skip + Limit
        const params = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(params, toShow)
        setSkip(skip)
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
        
        getProducts(params, toShow)
    }
    
    const handleChangeShow = (type) => {
        changeShow(type)
    }
    
    const renderProducts =  Products.map((product, index) => {
        return <Card key={index} productId={product._id} title={product.name} price={product.price} description={product.description} images={product.images}/>
    })
    return (
        <>
        <div className="w-2/3 mx-auto my-12">
            <div className="text-center flex justify-center mb-3">
                {/* <h2 className="font-bold border-b border-gray-200 pb-2">Welcome to Benny's Store <ShoppingCartOutlined/></h2> */}
                <Button isButton={true} title="Iphone Cases" action={()=>handleChangeShow('iphone')} href="/shop" addStyle={isActive('iphone')}/>
                <Button isButton={true} title="Airpod Cases" action={()=>handleChangeShow('airpod')} href="/shop" addStyle={isActive('airpod')}/>
                <Button isButton={true} title="All" action={()=>handleChangeShow('all')} href="/shop" addStyle={isActive('all')}/>
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
            <div className="flex justify-center">
                <button className="bg-transparent hover:bg-green-300 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-900 hover:border-transparent rounded focus:outline-none" onClick={handleLoadmore}>Load More</button>
            </div>
            }
        </div>
        <Footer/>
        </>
    )
}

const mapToStateProps = state => ({
    toShow: state.category.currentShow
})

export default connect (mapToStateProps, {changeShow})(Landing)
