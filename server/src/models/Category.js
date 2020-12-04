import mongoose from 'mongoose';


//db schema for user
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        unique: true
    },

}, {timestamps: true});

const Category = mongoose.model('Category', CategorySchema);
export default Category;