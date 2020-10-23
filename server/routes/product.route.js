import express from 'express'
const ProductRouter = express.Router();
import Product from '../models/Product.js';
import UserAuth from '../middleware/auth.js';
import AdminAuth from '../middleware/admin.auth.js';
import formidable from 'formidable';
import fs from 'fs';
import productById from '../middleware/productById.js';
import multer from 'multer';



//multer storage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    // fileFilter: (req, file, cb) => {
    //     const ext = path.extname(file.originalname)
    //     if (ext !== '.jpg' || ext !== '.png') {
    //         return cb(res.status(400).end('only jpg, png are allowed'), false);
    //     }
    //     cb(null, true)
    // }
})

const upload = multer({ storage: storage }).single("file")


//=================================
//             Product
//=================================

ProductRouter.post('/uploadImage', UserAuth, AdminAuth, (req, res) => {
    upload(req, res, err => {
        console.log(req)
        if (err) {
            console.log(err)
            return res.status(400).json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});
//@route POST api/product
//@desc Create Product
//@access Private Admin
ProductRouter.post('/', UserAuth, AdminAuth, (req,res)=>{
    console.log(req.files)
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files)=> {
        if(err) {
            return res.status(400).json({
                error: "Cannot upload product"
            })
        }
        console.log('Fields', fields)

        if(!fields.images) {
            return res.status(400).json({
                error: "Product Image is required"
            })
        }

        // if(files.image.type !=='image/jpeg' && files.image.type !=='image/jpg' && files.image.type !=='image/png'){
        //     return res.status(400).json({
        //         error: "Image type invalid"
        //     })
        // }


        //check the other fields of the form

        const {name, description, price, category, quantity, shipping} = fields;
        console.log(fields)
        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            })
        }
        fields.images = fields.images.split(',')
        let product = new Product(fields)

        //check image size 1MB = 1000000
        // if(files.image.size > 1000000){
        //     return res.status(400).json({
        //         error: 'Image should be less than 1MB '
        //     })
        // }

        // product.image.data = fs.readFileSync(files.image.path);
        // product.image.contentType = files.image.type;

        try{
            await product.save();
            res.status(200).json({
                success: true,
                msg: `New product "${product.name}" successfully saved`
            });
            
        }catch(error){
            console.log(error)
            res.status(500).send('Server error')
        }
        
    })
})

//@route GET api/product/categories
//@desc Get all categories that have products
//@access Public

ProductRouter.get("/categories", async (req,res) => {
  
    try {
        let categories = await Product.distinct('category')
        if(!categories) {
            return res.status(400).json({
                error: 'Categories not found'
            })
        }
        res.json(categories)

    } catch(error) {
        console.log(error)
        res.status(500).send('Server error')
    }

})

//@route DELETE api/product/categories
//@desc Delete all products
//@access Public

ProductRouter.delete("/", async (req,res) => {
  
    Product.deleteMany({}, (err)=>{
        if(err){
            return res.status(500).json({
                error:'Cannot delete products'
            })
        } 
        res.json({success: 'Successfully deleted'})
    })

})

//@route GET api/product/search
//@desc Search product using parameters
//@access Public

ProductRouter.get("/search", async (req,res) => {
    const query = {};
    if(req.query.search) {
        query.name = {
            $regex: req.query.search,
            $options: 'i'
        }

        if(req.query.category && req.query.category != 'All'){
            query.category = req.query.category;
        }
    }
  
    try {
        let products = await Product.find(query).select('-image');
        res.json(products)

    } catch(error) {
        console.log(error)
        res.status(500).send('Error getting products')
    }

})

//@route GET api/product/list
//@desc Get Product List
//options (order asc or desc, sort by product properties)
//@access Public

ProductRouter.get("/list", async (req,res) => {
    let listOrder = req.query.order ? req.query.order : 'asc' //get list order from query or set asc as default
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id' //set sortBy
    let limit = req.query.limit ? parseInt(req.query.limit) : 100; //limiting number of products return
    let skip = parseInt(req.query.skip) //skipping certain number of products
    
    try {
        console.log('Getting list')
        let list = await Product.find({}).select('-image').populate('category').sort([
                [sortBy, listOrder]
             ]).skip(skip).limit(limit).exec();
        res.json({list: list, size: list.length});

    } catch(error) {
        console.log(error)
        res.status(500).send('Invalid queries')
    }

})

//@route GET api/product/:productId
//@desc Get Product information
//@access Public

ProductRouter.get("/:productId", productById, (req,res) => {
    req.product.image = undefined;
    return res.json(req.product);
})

//@route GET api/product/image/:productId
//@desc Get Product image
//@access Public

ProductRouter.get("/image/:productId", productById, (req,res) => {
    if(req.product.image.data) {
        res.set('Content-Type', req.product.image.contentType)
        return res.send(req.product.image.data);
    }

    res.status(400).json({
        error: "Loading image failed"
    })
})



export default ProductRouter;
