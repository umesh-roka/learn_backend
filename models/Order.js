import mongoose from "mongoose";



const orderSchema = new mongoose.Schema({
  products: [
    {
      qty: { type: Number, required: true },
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  totalAmount:{
    type:Numbar,
    required:true
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);


export default Order;
