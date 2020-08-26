var express = require('express')
var carts = require('../model/client/cart')
var jwt = require('../utils/jwt')
var router = express.Router()
var user = require('../model/client/user')
var goods = require('../model/goods')


// 添加购物车
router.post('/addCart', function (req, res) {
    jwt.verifyToken(req,res).then(arr => {
        user.find(arr).then(arr => {
            if (arr.length > 0) {
                console.log(arr)
                let {good_id,num} = req.body
                // var num = num || 1 
                var data = {
                    user_id:arr[0]._id,
                    goods_id:good_id,
                    create_time: Date.now(),
                    num: num || 1
                }
                carts.find({user_id:arr[0]._id,goods_id:good_id,}).then(arr=>{
                    if(arr.length>0){
                        
                        var num =  arr[0].num + 1
                        console.log(num)
                      carts.updateOne({_id:arr[0]._id},{num:num}).then(arr=>{
                          res.json({err:0,msg:'增加成功',data:arr})
                      }).catch(err=>{
                          res.json({err:1,msg:'增加失败',data:err})
                      })
                    }else{
                        carts.insertMany(data).then(arr=>{
                            res.json({err:0,msg:'添加成功',data:arr})
                        }).catch(err=>{
                            res.json({err:1,msg:'添加失败',data:err})
                        })
                    }
                })
                
            }else{
                res.json({err:0,msg:'用户信息不匹配，请重新登录'})
            }
        })
    })

})

// 查询购物车产品信息
router.get('/seachCart',function(req,res){
    jwt.verifyToken(req,res).then(arr=>{
        user.find(arr).then(arr=>{
            if(arr.length>0){
                carts.find({user_id:arr[0]._id}).then(arr=>{
                    console.log(arr)
                    for(var i = 0;i<arr.length;i++){
                        goods.find({_id:arr[i].goods_id}).then(good=>{
                            console.log(good[0])
                            Object.assign(arr[i],good[0])
                            console.log(arr[i])
                        }) 
                    }
                    console.log(arr)
                    res.json({err:0,msg:'sucees',data:arr})
                })
            }else{
                res.json({err:0,msg:'用户信息不匹配，请重新登录'})
            }
        })
    })
})



module.exports = router