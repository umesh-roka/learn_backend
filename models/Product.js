import mongoose from "mongoose";



const productSchema = new mongoose.Schema({

  product_name: {
    type: String,
    unique: true,
    required: true
  },
  product_detail: {
    type: String,
    required: true
  },
  product_image: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  numReviews: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Clothes', 'Beauty', 'Tech'],
    required: true
  },
  brand: {
    type: String,
    required: true
  },



}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);


export default Product;
