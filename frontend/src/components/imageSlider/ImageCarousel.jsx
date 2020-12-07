import React from 'react';
import {Carousel} from 'antd';
import URLProduction from '../../helpers/URL';
import serverURL from '../../helpers/URL'

function ImageCarousel({images}) {
    // console.log(images)
    return (
        <div>
            <Carousel autoplay>
                {images.map((image,index)=>(
                    <div key={index}>
                        <img style={{width:'75%'}} src={`${serverURL}/${image}`} alt="product image"/>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageCarousel
