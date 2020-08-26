const mongoose = require('mongoose')

module.exports = mongoose.model('carts',mongoose.Schema({
    user_id:Object,
    goods_id:Object,
    create_time:Number,
    num:Number,
}))