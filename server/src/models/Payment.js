import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;

//db schema for user
const PaymentSchema = new mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    products: {
        type: Array,
        default: []
    }


}, {timestamps: true});


const Product = mongoose.model('Payment', PaymentSchema);
export default Product;