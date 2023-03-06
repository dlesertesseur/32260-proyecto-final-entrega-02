import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "products"}],
})

export default cartSchema;