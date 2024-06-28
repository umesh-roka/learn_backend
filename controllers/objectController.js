import Order from "../models/Order.js";

export const getAllOrder = async (req, res) => {
  
  try {
    
const orders = await Order.find({}).sort('-createdAt');
      return res.status(201).json({
       status:'sucess',
       data:orders
      });

    }
  
   catch (err) {
    return res.status(400).json(`${err}`);
  }
}

export const getOrderById = async (req, res) => {
const {id} = req.params;
  
  try {
    if(mongoose.isValidObjectId(id)){
 const order = await Order.findById(id);

      return res.status(201).json({
       status:'sucess',
       data:order
      });
    }
    else{
      return res.status(400).json({
        status:'success',
        message:'please provide valid id'
      });
    }
    }
  
   catch (err) {
    return res.status(400).json(`${err}`);
  }
}

export const addOrder = async (req, res) => {
  const { totalAmount, products } = req.body;
  try {
    
await Order.create({
  totalAmount,
  products,
  user:req.userId
});

      return res.status(201).json({
       status:'sucess',
       message:'order created'
      });

    }
  
   catch (err) {
    return res.status(400).json(`${err}`);
  }
}