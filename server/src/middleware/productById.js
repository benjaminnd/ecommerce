import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Product.js';

export default async function(req, res, next) {
    const {productId} = req.params

    if(!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(403).json({
            error: 'Product not found'
        })
    }

    try {
        let product = await (await Product.findById(productId)).populate('category');
        if(!product) {
            return res.status(403).json({
                error: 'Product not found',
            })
        }
        
        req.product = product
    } catch (error){
        console.log(error)
        res.status(500).send('Server error')
    }
    next()
}