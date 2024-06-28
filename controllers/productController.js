import Product from "../models/Product.js";
import mongoose from "mongoose";
import fs from 'fs';
export const getTopProducts = async (req, res, next) => {
  req.query = { rating: { $gt: 4.5 }, limit: 5 };
  next();
}





export const getProducts = async (req, res) => {



  const objFields = ['sort', 'search', 'fields', 'page', 'limit'];
  try {

    const queryObject = { ...req.query };

    objFields.forEach((ele) => delete queryObject[ele]);

    if (req.query.search) {
      queryObject.product_name = { $regex: req.query.search, $options: 'i' }
    }



    let query = Product.find(queryObject);


    if (req.query.sort) {
      const sorts = req.query.sort.split(',').join(' ');
      query = query.select(sorts);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }


    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * 10;
    query = query.skip(skip).limit(limit);

    const products = await query;


    return res.status(200).json({
      status: 'success',
      length: products.length,
      data: products
    });

  } catch (err) {
    return res.status(400).json({ status: 'error', message: `${err}` });
  }
}



export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.isValidObjectId(id)) {
      const product = await Product.findById(id);
      return res.status(200).json({ status: 'success', data: product });
    }
    return res.status(400).json({
      status: 'error',
      message: 'please provide valid id'
    });
  } catch (err) {
    return res.status(400).json({ status: 'error', message: `${err}` });
  }
}



export const addProduct = async (req, res) => {

  const {
    product_name,
    product_detail,
    product_price,
    countInStock,
    category,
    brand
  } = req.body;

  try {
    await Product.create({
      product_name,
      product_image: req.imagePath,
      product_detail,
      product_price,
      countInStock,
      category,
      brand
    });
    return res.status(200).json({
      status: 'success',
      message: 'product added'
    });
  } catch (err) {
    fs.unlink(`.${req.imagePath}`, (err) => console.log(err));
    return res.status(400).json({ status: 'error', message: `${err}` });
  }
}




export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const imagePath = req.imagePath;
  const {
    product_name,
    product_detail,
    product_price,
    countInStock,
    category,
    brand
  } = req.body;

  try {
    if (imagePath) {
      await Product.findByIdAndUpdate(id, {
        product_name,
        product_image: req.imagePath,
        product_detail,
        product_price,
        countInStock,
        category,
        brand
      });
    } else {
      await Product.findByIdAndUpdate(id, {
        product_name,
        product_detail,
        product_price,
        countInStock,
        category,
        brand
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'product updated'
    });
  } catch (err) {
    fs.unlink(`.${req.imagePath}`, (err) => console.log(err));
    return res.status(400).json({ status: 'error', message: `${err}` });
  }
}




export const removeProduct = async (req, res) => {
  const { id } = req.params;
  const { imagePath } = req.query;
  try {
    await Product.findByIdAndDelete(id);
    fs.unlink(`.${imagePath}`, (err) => console.log(err));
    return res.status(200).json({
      status: 'success',
      message: 'product removed'
    });
  } catch (err) {
    return res.status(400).json({ status: 'error', message: `${err}` });
  }
}