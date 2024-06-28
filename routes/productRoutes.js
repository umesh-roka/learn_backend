import express from "express";
import { addProduct, getProductById, getProducts, getTopProducts, removeProduct, updateProduct } from "../controllers/productController.js";
import { fileCheck, updateFile } from "../middleware/fileCheck.js";
import { adminCheck, userCheck } from "../middleware/checkUser.js";
import { handleAll } from "../utils/common.js";


const router = express.Router();



router.route('/')
  .get(getProducts).post(userCheck, adminCheck, fileCheck, addProduct).all(handleAll);

router.route('/top_products')
  .get(getTopProducts, getProducts).all(handleAll);
router.route('/:id')
  .get(getProductById).patch(userCheck, adminCheck, updateFile, updateProduct).delete(userCheck, adminCheck, removeProduct).all(handleAll);


export default router;