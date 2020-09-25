import jwt from 'jsonwebtoken';

const UserAuth = (req, res, next)=> {
    //Get token from request 
    const token = req.header('x-auth-token');

    //Check if existed

    if(!token) {
        return res.status(401).json({
            msg: 'No token, auth denied'
        })
    }

    //Verify token
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //set user id in req.user
        req.user = decoded.user;
        next()
    }catch(error) {
        req.status(401).json({
            msg: 'Token is not valid'
        })
    }
}

export default UserAuth;