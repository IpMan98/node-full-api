const jwt = require('jsonwebtoken')
var userModel = require('../model/userModel')

// 加密
function generateToken(data){
    let token = jwt.sign({
        data,
        exp:Math.floor(Date.now()/1000)+60*60*24*7,  //有效时间7天
        iat:Date.now()
    },'yewen')
    return token
}

// 解密并且验证
function verifyToken(req,res){
    let token = req.headers.authorization
    // console.log(req)
    if(!token){
        return res.json({err:-1,msg:'token invalid'})
    }
    return new Promise(function(resolve,reject){
        try{
            let decoded = jwt.verify(token,'yewen')
            resolve(decoded.data)
        } catch(err){
            res.json({err:1,msg:'token invalid'})
        }
    })
}
module.exports = {generateToken,verifyToken }