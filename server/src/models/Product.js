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

    productType: {
        type: String,
        required: true,
        maxlength: 200
    },

    quantity: {
        type: Number
    },

    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    shipping: {
        required: false,
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    }

}, {timestamps: true});

ProductSchema.index({
    name: 'text',
    description: 'text'
}, {
    weights: {
        name: 5,
        description: 1
    }
})

const Product = mongoose.model('Product', ProductSchema);
export default Product;