import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import URLDevelopment from '../../helpers/URL'

function ProductImage({product}) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        if(product.images && product.images.length > 0) //check if product has images
        {
            let images = []
            product.images && product.images.map(item=> {
                images.push({
                    original: `${URLDevelopment}/${item}`,
                    thumbnail: `${URLDevelopment}/${item}`
                })
            })
            setImages(images)
        }
    }, [product])
    return (
        <ImageGallery items={Images}/>
    )
}

export default ProductImage
