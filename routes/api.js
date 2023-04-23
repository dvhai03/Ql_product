var express = require('express');
var router = express.Router();
var user_api = require('../controller/api/user.api');
var sanpham_api = require('../controller/api/sanpham.api');


//  URL:   GET:   /api/users
router.get('/users', user_api.list );


router.post('/users',user_api.add);


router.post('/users/login', user_api.login);

router.post('/users/reg',user_api.add);
 

router.get('/sanpham', sanpham_api.list );
router.get('/sanpham/:id_sp', sanpham_api.chi_tiet );

module.exports = router;
