import mongoose from 'mongoose';
import Category from '../models/Category.js';

export default async function(req, res, next) {
    const {categoryId} = req.params

    if(!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(403).json({
            error: 'Category not found'
        })
    }

    try {
        let category = await Category.findById(categoryId)
        if(!category) {
            return res.status(403).json({
                error: 'Category not found',
            })
        }

        req.category = category
        next()
    } catch (error){
        console.log(error)
        res.status(500).send('Server error')
    }
}