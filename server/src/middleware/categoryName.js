const  categoryName = (req,res,next) =>{
    let name = req.body
    let value = name.trim()
    if(value == '') {
        return res.status(400).json({
            error: 'Category name is invalid'
        })
    }
    next()
}

export default categoryName