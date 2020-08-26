const mongoose = require('mongoose')

//创建一个Schema

//model就是来做增删改查
//.find()  .insertMany()  .updateOne()  .deleteOne()
module.exports = mongoose.model('admins',mongoose.Schema({
  password:String,
  username:String,
  // create_time:Number
}))

