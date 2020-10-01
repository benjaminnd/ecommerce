import express from 'express'
const ProductRouter = express.Router();
import Product from '../models/Product.js';
import UserAuth from '../middleware/auth.js';
import AdminAuth from '../middleware/admin.auth.js';
import formidable from 'formidable';
import fs from 'fs';

//@route POST api/product
//@desc Create Product
//@access Private Admin
ProductRouter.post('/', UserAuth, AdminAuth, (req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files)=> {
        if(err) {
            return res.status(400).json({
                error: "Cannot upload image"
            })
        }

        if(!files.image) {
            return res.status(400).json({
                error: "Product Image is required"
            })
        }

        if(files.image.type !=='image/jpeg' && files.image.type !=='image/jpg' && files.image.type !=='image/png'){
            return res.status(400).json({
                error: "Image type invalid"
            })
        }


        //check the other fields of the form

        const {name, description, price, category, quantity, shipping} = fields;
        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            })
        }

        let product = new Product(fields)

        //check image size 1MB = 1000000
        if(files.image.size > 1000000){
            return res.status(400).json({
                error: 'Image should be less than 1MB '
            })
        }

        product.image.data = fs.readFileSync(files.image.path);
        product.image.contentType = files.image.type;

        try{
            await product.save();
            res.json(`New product "${product.name}" successfully saved`);

        }catch(error){
            console.log(error)
            res.status(500).send('Server error')
        }

    })
})

export default ProductRouter;
