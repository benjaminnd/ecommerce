 import express from 'express'
const ProductRouter = express.Router();
import Product from '../models/Product.js';
import UserAuth from '../middleware/auth.js';
import AdminAuth from '../middleware/admin.auth.js';
import formidable from 'formidable';
import fs from 'fs';
import productById from '../middleware/productById.js';
import multer from 'multer';
import mongoose from 'mongoose';
const {ObjectId} = mongoose.Types.ObjectId;



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

ProductRouter.get('/all', async(req, res)=> {
    Product.find({}).exec((err, list)=>{
        if (err) return res.status(400).send({success: false, err})
        return res.status(200).send({success: true, list})
    })
})

ProductRouter.post('/uploadImage', UserAuth, (req, res) => {
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

//@route POST api/product/list
//@desc Get Product List
//options (order asc or desc, sort by product properties)
//@access Public

ProductRouter.post("/list", async (req,res) => {
    console.log('Request body--------------', req.body)
    let listOrder = req.body.order ? req.body.order : 'asc' //get list order from query or set asc as default
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id' //set sortBy
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; //limiting number of products return
    let skip = parseInt(req.body.skip) //skipping certain number of products
    let findArgs = {};
    let term = req.body.searchText == '' ? ' ' : req.body.searchText 
    let toShow = req.body.toShow
    console.log('filters', req.body.filters)
    for(let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {
            if(key==="price"){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else if(key==="category") { 
                findArgs[key] = req.body.filters[key]
            }else{
                if(key==="sortBy"){
                    sortBy = req.body.filters[key]
                }else{
                    listOrder = req.body.filters[key]
                }
            }
        }
    }
    console.log(toShow)
    if(toShow != 'all') {
        findArgs['productType'] = toShow
    }
    if(term) findArgs['name'] = {$regex: term, $options: 'i'}
    console.log('findArgs', findArgs)

    if(!term){
        try {
            console.log('Getting list')
            let list = await Product.find(findArgs).select('-image').populate({path:'category'}).sort([
                    [sortBy, listOrder]
                 ]).skip(skip).limit(limit).exec();
            console.log(list)
            res.json({list: list, size: list.length});
        } catch(error) {
            console.log(error)
            res.status(500).send('Invalid queries')
        }
    }else{
        console.log('search bar activated')
        try {
            console.log('Getting list')
            let list = await Product.find(findArgs).select('-image').populate({path:'category'}).sort([
                    [sortBy, listOrder]
                 ]).skip(skip).limit(limit).exec();
            console.log(list.length)
            res.json({list: list, size: list.length});
    
        } catch(error) {
            console.log(error)
            res.status(500).send('Invalid queries')
        }
    }

})
  
//@route GET api/product/:productId
//@desc Get Product information
//@access Public
ProductRouter.get("/:productId", productById, (req,res) => {
    req.product.image = undefined;
    console.log('Querying product')
    Product.findByIdAndUpdate(
        {_id: req.product._id},
        {views: req.product.views + 1},
        (err, product)=>{
            if(err)  return res.status(400).json(err)
            console.log('new views', product.views)
            return res.status(200).json(product)
        }
    )
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

//@route GET api/product/getCartItems
//@desc Get Product information
//@access Public
ProductRouter.post("/getCartItems", async (req,res) => {
    const ids =  req.query.cartItems.split(',')
    try{
        let list = await Product.find({_id: {$in: ids}})
        return res.json(list)
    } catch(error){
        console.log(error)
        res.status(500).send('Invalid query')
    }
})

export default ProductRouter;
