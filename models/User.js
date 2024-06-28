import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required']
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);


export default User;
