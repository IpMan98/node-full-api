const mongoose = require('mongoose')

module.exports = mongoose.model('user',mongoose.Schema({
    password:String,
    username:String,
    // create_time:Number
  }))