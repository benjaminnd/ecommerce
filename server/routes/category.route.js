import express from 'express'
import UserAuth from '../middleware/auth.js';
import expressValidator from 'express-validator';
import AdminAuth from '../middleware/admin.auth.js';
import Category from '../models/Category.js';
import categoryById from '../middleware/categoryById.js';
const {check, validationResult} = expressValidator;
const CategoryRouter = express.Router();


//@route POST api/category
//@desc Create Category
//@access Private Admin
CategoryRouter.post('/', [check('name', 'Name is required').trim().not().isEmpty()], UserAuth, AdminAuth, async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
     const {name} = req.body
    try{

        let category = await Category.findOne({name});
        if(category){
            return res.status(403).json({
                error: 'Category already exists'
            })
        }
        const newCat = new Category({name});
        category = await newCat.save()
        console.log('created category: ', category);
        res.json(category);
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
})


//@route GET api/category/all
//@desc Get all  categories
//@access Public
CategoryRouter.get('/all', async(req, res)=> {
    try{
        const categories = await Category.find({})
    //console.log('All categories: ', categories)
    res.json(categories)
    }catch(error){
        console.log(error);
        res.status(500).send('Server error')
    }
})

//@route GET api/category/:categoryId
//@desc Get Single category
//@access Public

CategoryRouter.get('/:categoryId', categoryById, async(req,res)=> {
    console.log('Getting category with id ', req.params.categoryId);
    res.json(req.category);
})


//@route Put api/category/:categoryId
//@desc Update Single category
//@access Private admin

CategoryRouter.put('/:categoryId',UserAuth, AdminAuth, categoryById, async(req,res)=> {
    let category = req.category
    const {name} = req.body
    if(name) category.name = name.trim()
    try{
        category = await category.save()
        res.json(category)
    }catch(error){
        console.log(error);
        res.status(500).send('Server error')
    }

})

//@route DELETE api/category/:categoryId
//@desc Delete Single category
//@access Private admin

CategoryRouter.delete('/:categoryId',UserAuth, AdminAuth, categoryById, async(req,res)=> {
    let category = req.category
    try{
        let deleletedcategory = await category.remove()
        res.json(`Successfully deleted category ${deleletedcategory.name}`)
    }catch(error){
        console.log(error);
        res.status(500).send('Server error')
    }

})
export default CategoryRouter