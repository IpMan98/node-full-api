const mongoose = require('mongoose')

module.exports = mongoose.model('cates',mongoose.Schema({
  rank:Number,
  cate:String,
  cate_zh:String
}))


