import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import {PlusOutlined} from '@ant-design/icons'
import axios from 'axios'
import { toast } from 'react-toastify'
import URLProduction from '../../helpers/URL'
const FileUpload = ({imagesRefresh})=>{

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
            const res = await axios.post(`${URLProduction}/api/product/uploadImage`, formData, config)
            if(res.data.success) {
                //toast.success(`successfully added ${res.data.image}`)
                setImages([...Images, res.data.image])
                imagesRefresh([...Images, res.data.image])
            }
        }catch(error){
            toast.error(error.response.data.msg)
            console.log(error.response) 
        }
     }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        imagesRefresh(newImages)
    }

    return (
        <>
        <label htmlFor="fileupload" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Add Images</label>
        <div id="fileupload" className="flex justify-between">
            <Dropzone
                onDrop={onDrop}
                multiple={false}
            >
                {({ getRootProps, getInputProps }) => (
                    <div className="flex items-center justify-center w-1/3 border-solid border-gray-400 border-2 h-64"
                        {...getRootProps()}
                    >
                        {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })}
                        <input name="file" {...getInputProps()} />
                        <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div className="flex w-1/2 overflow-x-scroll scrolling-touch">

                {Images.map((image, index) => 
                (
                    <div key={index} onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${URLProduction}/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
        </>
    )
}

export default FileUpload 