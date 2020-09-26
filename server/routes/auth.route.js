import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import expressValidator from 'express-validator';
import gravatar from 'gravatar';
import User from '../models/Users.js';
import UserAuth from '../middleware/auth.js';


const UserRouter = express.Router();
const{check, validationResult} = expressValidator;


//@route GET api/user
//@desc User Info
//@access Private

UserRouter.get('/', UserAuth, async(req, res) => {
    try {
        console.log('get default user')
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
        console.log(user);
    }catch(error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
})

//USER REGISTER
//Register user POST api/user/register; PUBLIc
UserRouter.post('/register', [
    //validate
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Password must include 8 or more characters').isLength({
        min: 8
    })
], async(req,res)=>{
    const errMessages = validationResult(req);
    if(!errMessages.isEmpty()){ //Invalid request handling
        return res.status(400).json({
            errors: errMessages.array()
        });
    }

    const {name, email, password} = req.body;

    try {
        //Check if information already taken
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                errors:[
                    {
                        msg:'This email has been already taken'
                    }
                ]
            });
        }
        //If email not existed get image
        const avatar = gravatar.url(email, {
            s: '250',
            r: 'pg',
            d: 'mm'
        })
        //Create User
        user = new User({
            name, email, avatar, password
        })

        const salt =  await bcrypt.genSalt(10);
        //save password 
        user.password = await bcrypt.hash(password, salt)
        //save user in sb
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 360000
            },
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        )


    } catch (err){
        console.log(err.message)
        res.status(500).send('Server error')
    }


});

//USER LOGIN
UserRouter.post('/login', [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()
], async(req, res)=>{
    //If invalid
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    //get email and passwsord from request body
    const{email, password} = req.body;

    try {
        let user = await User.findOne({
            email
        });
        //If not found
        if(!user) {
            return res.status(400).json({
                errors: [{
                    msg: "User does not exist. Please try another credentials"
                }]
            })
        }
        //create payload
        const payload = {
            user: {
                id:user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err;
                res.json({
                    token
                })
            }
        )

    }catch (error){
        console.log(error.message);
        res.status(500).send("Server error");
    }
});
export default UserRouter;