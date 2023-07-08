var express = require('express');
var router = express.Router();
var myMD = require('../models/hoadon.model');

var hoadonController=require('../controller/hoadon.controller');

router.get('/',hoadonController.getlisthd);
router.get('/xacnhan/:_id', async (req,res,next)=>{
    let ar = await myMD.hoadonModel.findById(req.params._id);
    if(ar.trangthai=="Đã xác nhận"){
        msg = 'Da xac nhan';
        console.log(msg);
        res.redirect('/hoadon');
    }else{
        let objSP = new myMD.hoadonModel();
        objSP.trangthai="Đã xác nhận"
        objSP._id = req.params._id;
        try {  
            await myMD.hoadonModel.findByIdAndUpdate(req.params._id, objSP);
            res.redirect('/hoadon');
            // msg = 'Đã cập nhật thành công!';
    
        } catch (error) {
            msg = 'Lỗi ghi CSDL: '+ error.message;
            console.log( error );
        }
    }
  
});


module.exports=router;