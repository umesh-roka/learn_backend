import express from "express";
import { userLogin, userSignUp } from "../controllers/userController.js";
import Joi from 'joi';
import validator from 'express-joi-validation';
import { handleAll } from "../utils/common.js";

const router = express.Router();

const valid = validator.createValidator({});

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().max(20).min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(20).min(6).required()
});




router.route('/')
  .get(userLogin);

router.route('/login')
  .post(valid.body(loginSchema), userLogin).all(handleAll);

router.route('/signup')
  .post(valid.body(userSchema), userSignUp).all(handleAll);

  router.route('/profile/:id')
  patch().all(handleAll);



export default router;