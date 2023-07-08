var express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
var uploader = multer({dest: './tmp'});
var spCOntroller=require('../controller/sanpham.controller');
var myMD = require('../models/sanpham.model');

const { log } = require('console');

//trang danh sach
router.get('/',spCOntroller.getlistsp);
router.post('/',spCOntroller.getlistsp);
router.get('/chitiet/:idsp',spCOntroller.chiTietSP);
router.get('/addSP',spCOntroller.addSP);

router.post('/addSP',uploader.single("image"),spCOntroller.addSP);

router.get('/delete/:id', async (req,res,next)=>{
    await myMD.spModel.findByIdAndDelete({_id:req.params.id});
    res.redirect('/product');
});



router.get('/category',spCOntroller.addTL);
router.post('/category',spCOntroller.addTL);


router.get('/category/edit_tl/:idtl',spCOntroller.edit_theloai);
router.post('/category/edit_tl/:idtl',spCOntroller.edit_theloai);

router.get('/category/delete_tl/:id_theloai', async (req,res,next)=>{
    await myMD.theloaiModel.deleteMany({_id:req.params.id_theloai});
    res.redirect('/product/category');
});


router.get('/edit/:idsp',spCOntroller.editSP);


router.post('/edit/:idsp',uploader.single("image"),spCOntroller.editSP);


//can co export
module.exports=router;