/**
 * 创建数据库模型(model)
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 创建Schema（模式对象）
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
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
  },
  avatar: {
    type: String
  },
  Date: {
    type: Date,
    default: Date.now
  }
})

// 创建Model
module.exports = User = mongoose.model("users", UserSchema);