import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, require: true, default: 0 },
    },
  ],
});

export default cartSchema;
