var express = require('express');
var cates = require('../model/cate')
var jwt = require('../utils/jwt')
var router = express.Router();

// 查询所有品类
router.get('/getCate',function(req,res){
    cates.find({}).then(arr=>{
        res.json({err:0,msg:'success',data:arr})
    })
})

// 新增品类
router.post('/addCate',function(req,res){
    let {cate,cate_zh } = req.body
    console.log(req.body)
    if(cate.length>0 && cate_zh.length>0){
        var l = cates.find({}).then(arr=>{   
            var date = {
                rank:arr.length + 1,
                cate,
                cate_zh
            }
            cates.insertMany(date).then(arr=>{
                if(arr){
                    res.json({err:0,msg:'success'})
                }else{
                    res.json({err:1,msg:'添加失败'})
                }
                
            })
        })
    }else{
        res.json({err:1,msg:'滚蛋，信息不能为空'})
    }
    
})
module.exports = router;