const mongoose = require("mongoose");
/**
 * Schema对象模式
 * 模式可以包含任意数量的字段，每个字段代表MongoDB文档中的一段存储区域,每个schema都会映射到一个MongoDB collection
 * 定义这个collection里的文档的构成
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
//将schema转换为一个Model并导出
module.exports = mongoose.model("User", userSchema);
/**
 * 实例方法(method)
 * documents是Models的实例, 可以定义自己的方法
 * 先定义对象模式
 * const animalSchema = new mongoose.Schema({name: String, type: String})
 * 再将一个函数赋值给对象模式的methods对象
 * animalSchema.methods.findSimilarTypes = function(cb) {
 *    return this.model('Animal').find({type: this.type}, cb);
 * }
 * 再将对象模式转换为一个Model
 * const Animal = mongoose.Model("Animal", animalSchema);
 * const dog = new Animal({type: "dog"});
 * dog.findSimilarTypes()
 */