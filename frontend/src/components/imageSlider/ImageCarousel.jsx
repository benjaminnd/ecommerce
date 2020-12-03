import React from 'react';
import {Carousel} from 'antd';

function ImageCarousel({images}) {
    // console.log(images)
    return (
        <div>
            <Carousel autoplay>
                {images.map((image,index)=>(
                    <div key={index}>
                        <img style={{width:'75%'}} src={`http://localhost:5000/${image}`} alt="product image"/>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageCarousel
