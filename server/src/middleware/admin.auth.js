import User from '../models/Users.js';

const AdminAuth = async (req,res,next) =>{
    try{
        const user = await User.findOne({
            _id: req.user.id
        });

        if(user.role === 0){
            return res.status(403).json({
                error: 'Admin access denied'
            })
        }

        next()

    }catch(error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
}

export default AdminAuth;