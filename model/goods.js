const mongoose = require('mongoose')

module.exports = mongoose.model('goods',mongoose.Schema({
  rank:Number,
  img:String,
  name:String,
  desc:String,
  price:Number,
  cate:String,
  hot:Boolean,
  create_time:Number
}))