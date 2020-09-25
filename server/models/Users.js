import mongoose from 'mongoose';


//db schema for user
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    image:{ //avatar
        type: String
    },
    role:{ //numeric 0 for admin 1 for normal
        type: Number,
        default: 0
    },
    history: { //orders history of user
        type: Array,
        default: []
    }

    
});

const User = mongoose.model('User', UserSchema);
export default User;