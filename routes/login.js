var express = require('express');
var path = require('path');
var router = express.Router();
var spCOntroller=require('../controller/login');
var check = require('../middlewares/check');


//trang danh sach
router.get('/', spCOntroller.login);
router.post('/',spCOntroller.login);
router.get('/home',check.login,  spCOntroller.home);
router.get('/signup',spCOntroller.reg)
router.post('/signup',spCOntroller.reg);

//can co export
module.exports=router;