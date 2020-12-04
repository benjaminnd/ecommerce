import User from '../models/Users.js';

const RegisterValidator = async(req, res, next) => {
  const {name, email , password} = req.body
  console.log(isEmail(email));
  console.log(isEmpty(name));
  console.log(isValid(password));

  let errorMsg = [];
  //validate all fields and create appropriate error messages
  if(!isEmail(email)){
      errorMsg = errorMsg.concat({msg: 'Please enter a valid email'})
  }

  if(isEmpty(name)){
      errorMsg = errorMsg.concat({msg: 'Please enter a valid name'})
  }

  if(!isValid(password)){
      errorMsg = errorMsg.concat({msg: 'Please enter a valid password'})
  }
  console.log(errorMsg)
  //return errorMsg array if there are errors
  if(errorMsg.length > 0){
      return res.status(400).json({
          errors: errorMsg
      })
  }

  try {
  //Check if email has already been taken
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
  }catch(err){
    res.status(500).send('Server Error')
  }

  next()

}

//this function check if the req email is in valid form
const isEmail = (email) => {
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return mailFormat.test(email)
}


//this function check whether the argument passed is empty string or not
const isEmpty = (name) => {
    let value = name.trim()
    return value == '';
}

//password is valid if contains no space and has minimum 8 characters
const isValid = (password) => {
    return (password.trim().length >= 8) 
}



export default RegisterValidator;