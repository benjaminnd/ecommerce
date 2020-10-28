import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Button from '../components/buttons/button.component'
import Container from '../components/containers/container.component'
import DropdownMenu from '../components/dropdown/dropdown.component'
import FormInput from '../components/inputs/input.component'
import FileUpload from'../components/fileupload/fileupload.component'
import {addProduct, finishUpload, loadProducts} from '../data/reducers/product'
import {useHistory} from 'react-router-dom'


const UploadProduct = ({addProduct, finishUpload, stateCategories, uploadSuccessful}) => {
    let history = useHistory();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        category: null,
        images: null
    })

    const [images, setImages] = useState([])

    useEffect(() => {
        console.log('Current categories', stateCategories)
        console.log('Current images', product)
    })

    useEffect(() => {
        setProduct({...product, images: images})
    }, [images])

    useEffect(()=>{
        if(uploadSuccessful){
            finishUpload();  
            history.push('/')
        }
    }, [uploadSuccessful])

    const handleChange = name => e => {
        setProduct({...product, [name] : (name =='shipping' ? e.target.checked : e.target.value)})
    }

    const handleSelect = selected => {
        setProduct({...product, category: selected })
    }

    //handle onFileChange
    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file){
            // console.log(file.name);
            // console.log(file.size);
            // console.log(file.type);

        }
        setProduct({...product, image: file})
    }

    const onAddImage = uploadImages => {
        console.log('images', uploadImages)
        setImages(uploadImages)
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
            <FileUpload imagesRefresh={onAddImage} />
            <FormInput
                title='Product Name' 
                placeholder='Product name'
                value={product.name}
                handleChange={handleChange('name')}
                type='text'
            />
            <DropdownMenu
                title='Product Category' 
                options={stateCategories}
                onSelect={handleSelect}
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
                type='number'
            />
            {/* <FormInput
                title='Image' 
                placeholder='Add product image'
                handleChange={handleFileChange}
                type='file'
                acceptValue='image/png, image/jpeg'
            /> */}
            <FormInput
                title='Quantity' 
                placeholder='Quantity'
                handleChange={handleChange('quantity')}
                type='number'
            />
            <FormInput
                title='Shipping' 
                placeholder='Shipping available'
                value={product.shipping}
                defaultChecked={product.shipping}
                handleChange={handleChange('shipping')}
                type='checkbox'
            />
            <div>
            <Button title='Add Product' addStyle='bg-primary text-white w-full mb-3' action={onSubmit} type='submit'/>
            </div>
            </form>
        </Container>
    )
}

const mapToStateProps = state => ({
    stateCategories: state.category.categories,
    uploadSuccessful: state.product.productUploaded
})
export default connect(mapToStateProps, {addProduct, finishUpload})(UploadProduct)
