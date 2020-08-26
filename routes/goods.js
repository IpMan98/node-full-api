var express = require('express');
var goods = require('../model/goods')
var jwt = require('../utils/jwt')
var router = express.Router();

// 添加和编辑商品
router.post('/addGoods',function(req,res){
    let{img,name,desc,price,cate,hot,rank,id}=req.body
    if(!img) return res.json({err:1, msg:'img是必填参数'})
    if(!name) return res.json({err:1, msg:'name是必填参数'})
    if(!desc) return res.json({err:1, msg:'desc是必填参数'})
    if(!price) return res.json({err:1, msg:'price是必填参数'})
    if(!cate) return res.json({err:1, msg:'cate是必填参数'})
    hot = hot || false 
    price = Number(price)
    rank =  parseInt(rank || 0)
    let create_time = Date.now()
         
    if(id){
        goods.updateOne({_id:id},{img,name,desc,price,cate,hot,rank}).then(()=>{
            res.json({err:0,msg:'修改成功'})
        }).catch(err=>{
            res.json({err:1,msg:'修改失败'})
        })
    }else{
        goods.insertMany({rank,img,name,desc,price,cate,hot,create_time}).then(()=>{
            res.json({err:0,msg:'添加成功'})
        }).catch(err=>{
            console.log("1",err)
            res.json({err:1,msg:'添加失败'})
        })
    }
})
// 通过(_id)查找商品
router.get('/seach',function(req,res){
   let {id} = req.query
   if(!id)return res.json({err:1,msg:'id不能为空'})
   goods.find({_id:id}).then(arr=>{
       res.json({err:0,msg:'success',data:arr})
   })
})
// 通过品类查找商品
router.get('/cateGoods',function(req,res){
    let {cate} = req.query
    if(!cate)return res.json({err:1,msg:'品类不能为空'})
    goods.find({cate}).then(arr=>{
        res.json({err:0,msg:'success',data:arr})
    })
 })
 

//获取所有商品
router.get('/getGoods',function(req,res){
    // console.log('请求头',req.query)
    let{page,size,cate}=req.query

    page =  parseInt(page || 1)
    size = parseInt(size || 5)
    cate = cate || ''

    let params = {cate}
    if (!cate) delete params.cate

    goods.find().then(arr=>{
        let total = arr.length
        goods.find(params).limit(size).skip((page-1)*size).sort({create_time: -1}).then(list=>{     
            res.json({err:0,msg:'success', data: { list, total }})
        }).catch(err=>{
            res.json({err:1,msg:'请求失败',err})
        })
    })
})

// 删除商品
router.get('/removeGoods',function(req,res){
     let { id } = req.query
     if(!id)return res.json({err:1,msg:'商品id不能为空'})
    goods.deleteOne({_id:id}).then(()=>{
        res.json({err:0,msg:'删除成功'})
    }).catch(arr=>{
        res.json({err:1,msg:'删除失败',data:arr})
    })
})

module.exports = router