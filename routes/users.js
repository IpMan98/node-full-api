var express = require('express');
var userModel = require('../model/userModel')
var jwt = require('../utils/jwt')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post('/login', function (req, res) {
  let {username,password} = req.body
  userModel.find({username,password}).then(arr => {
    if (arr.length === 1) {
      let token = jwt.generateToken({ username,password})
      res.json({err: 0,msg: '登录成功',data: { token,username} })
    } else {
      res.json({err: 1,msg: '用户名或者密码错误'})
    }
  })
})

// 帐号验证
router.get('/getUsers', function (req, res){
   jwt.verifyToken(req,res).then(arr=>{
      userModel.find(arr).then(()=>{
        console.log(arr)
        res.json({err:0,msg:'验证成功'})
      })
     
   })
});

module.exports = router;