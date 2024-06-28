import express from "express";
import { addOrder, getAllOrder, getOrderById } from "../controllers/objectController.js";
import { handleAll } from "../utils/common.js";
import { adminCheck, userCheck } from "../middleware/checkUser.js";

const router = express.Router();



router.route('/')
.get(userCheck,adminCheck,getAllOrder).post(userCheck,addOrder).all(handleAll);
router.route('/:id')
.get(userCheck,getOrderById).all(handleAll);

export default router;