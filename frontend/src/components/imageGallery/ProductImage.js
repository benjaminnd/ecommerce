import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage({product}) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        if(product.images && product.images.length > 0) //check if product has images
        {
            let images = []
            product.images && product.images.map(item=> {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(images)
        }
    }, [product])
    return (
        <div>
            <ImageGallery items={Images}/>
        </div>
    )
}

export default ProductImage
