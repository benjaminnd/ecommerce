import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;

//db schema for user
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        maxlength: 200,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 32,
    },
    category: {
        type: ObjectId,
        required: true,
        ref: "Category"
    },

    quantity: {
        type: Number
    },

    sold: {
        type: Number,
        default: 0
    },
    image: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }




}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);
export default Product;