var express = require('express');
var path = require('path');
var router = express.Router();
var myMD = require('../models/user.model');
var userController=require('../controller/user.controller');

//trang danh sach
router.get('/',userController.user)
router.post('/',userController.user)

router.get('/edit/:iduser',userController.editUser);
router.post('/edit/:iduser',userController.editUser);
//can co export

router.get('/remove/:iduser', async (req,res,next)=>{
    await myMD.userModel.findByIdAndDelete({_id:req.params.iduser});
    res.redirect('/user');
});
module.exports=router;