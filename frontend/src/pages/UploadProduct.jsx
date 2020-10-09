import React, { useState } from 'react'
import Container from '../components/containers/container.component'
import FormInput from '../components/inputs/input.component'
import {loadCategories} from '../data/reducers/category'
import {addProduct} from '../data/reducers/product'

const UploadProduct = ({addProduct,loadCategories}) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        catgegory: null,
    })

    const handleChange = name => e => {
        setProduct({...product, [name] : e.target.value})
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('adding product', product);
        addProduct(product);
    }
    return (
        <Container>
            <form className="bg-white rounded-lg overflow-hidden shadow-2xl p-5 my-16"  onSubmit={onSubmit}>
            <h2 className="font-bold text-3xl text-center mb-5">Add Product</h2>
            <FormInput
                title='Product Name' 
                placeholder='Product name'
                value={product.name}
                handleChange={handleChange('name')}
                type='text'
            />
            <FormInput
                title='Description' 
                placeholder='Product Description'
                value={product.description}
                handleChange={handleChange('description')}
                type='text'
            />
            <FormInput
                title='Price' 
                placeholder='0.00'
                value={product.price}
                handleChange={handleChange('price')}
                type='text'
            />
            </form>
        </Container>
    )
}

export default UploadProduct
