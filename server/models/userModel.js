const mongoose = require("mongoose");
/**
 * Schema对象模式
 * 模式可以包含任意数量的字段，每个字段代表MongoDB文档中的一段存储区域
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  }
})

module.exports = mongoose.model("User", userSchema);