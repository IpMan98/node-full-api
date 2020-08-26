const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/2002',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var db = mongoose.connection;

//连接成功
db.on('open',function(){
  console.log('数据库连接成功')
})

// 连接失败
db.on('error',function(){
  console.log('数据库连接失败')
})