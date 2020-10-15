import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import {PlusOutlined} from '@ant-design/icons'
import axios from 'axios'
import { toast } from 'react-toastify'
import URLDevelopment from '../../helpers/URL'
const FileUpload = ()=>{

    const [Images, setImages] = useState([])

    const onDrop = async (files) => {
        console.log(files[0])
        let formData = new FormData();
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        formData.append('file', files[0])
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        setImages([...Images, files[0]])
        //save the Image we chose inside the Node Server 
        try{
            const res = await axios.post(`${URLDevelopment}/api/product/uploadImage`, formData, config)
            if(res.data.success) {
                toast.success(`successfully added ${res.data.image}`)
                setImages([...Images, res.data.image])
            } else {
                toast.error('Failed to save the Image in server')
            }
        }catch(error){
                console.log(error.response)
            
        }
     }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        //props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={1000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })}
                        <input name="file" {...getInputProps()} />
                        <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => 
                (
                    <div key={index} onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${URLDevelopment}/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload 