import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import URLProduction from '../../helpers/URL'
import serverURL from '../../helpers/URL';


function ProductImage({product}) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        if(product.images && product.images.length > 0) //check if product has images
        {
            let images = []
            product.images && product.images.map(item=> {
                images.push({
                    original: `${serverURL}/${item}`,
                    thumbnail: `${serverURL}/${item}`
                })
            })
            setImages(images)
        }
    }, [product])
    return (
        <ImageGallery showThumbnails={Images.length >= 2 ? true : false} items={Images} showPlayButton={false} showNav={false} showFullscreenButton={false} autoPlay={true}/>
    )
}

export default ProductImage
