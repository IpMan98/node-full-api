var express = require('express');
var user = require('../model/client/user')
var jwt = require('../utils/jwt')
var router = express.Router();

// 注册帐号
router.post('/regist', function (req, res) {
    let {username,password} = req.body
    user.find({username}).then(arr => {
        if (arr.length > 0) {
            console.log(arr)
            res.json({err: 1,msg: '用户名已存在'})
        } else {
            user.insertMany({username,password}).then(arr => {
                res.json({err: 0,msg: '注册成功',data: arr})
            }).catch(err => {
                res.json({ err: 1,msg: '注册失败',data: err})
            })
        }
    })
})

// 登录帐号
router.post('/login',function(req,res){
    let {username,password} = req.body
    user.find({username,password}).then(arr=>{
        var token = jwt.generateToken({username,password})
        res.json({err:0,msg:'登录成功',data:{token,name:username}})
    }).catch(err=>{
        res.json({err:1,msg:'登录失败',data:err})
    })
})

module.exports = router