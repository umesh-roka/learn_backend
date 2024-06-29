import express from 'express';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import orderRouter from './routes/orderRoutes.js'
const port = 5000;
const app = express();




mongoose.connect('mongodb+srv://umesh79:magar123@cluster0.fxuyzvs.mongodb.net/Shops').then((val) => {


  app.listen(port, () => {
    console.log('connected server is running');
  })
});

app.use(cors());
app.use(morgan('dev'));
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
  // abortOnLimit: true
}));

app.use(express.json());

app.use('/uploads', express.static('uploads'));






app.get('/', (req, res) => {


  return res.status(200).json({
    status: 'success',
    data: 'welcome to the backs jee'
  });
});




app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
application.use('/api/orders',orderRouter);


