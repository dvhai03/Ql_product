var express = require('express');
var router = express.Router();
var user_api = require('../controller/api/user.api');
var sanpham_api = require('../controller/api/sanpham.api');
var hoadon_api = require('../controller/api/hoadon.api');
var myMD = require('../models/hoadon.model');
var middleware = require('../middlewares/api-auth');

//  URL:   GET:   /api/users
router.get('/users', user_api.list );


router.post('/users',user_api.add);


router.post('/users/login', user_api.login);

router.post('/users/reg',user_api.add);
 
router.post('/users/edit/:iduser',user_api.edit_mk);

router.get('/users/profile',middleware.api_auth ,user_api.profile); // lấy thông tin user
router.get('/users/logout',middleware.api_auth, user_api.logout);
 
router.get('/sanpham', sanpham_api.list );
router.get('/sanpham/:id_sp', sanpham_api.chi_tiet );
router.get('/giohang',sanpham_api.listgiohang);



router.post('/giohang/add',sanpham_api.addgh);

router.get('/giohang/delete/:id',sanpham_api.deletegh);

router.get('/binhluan',sanpham_api.listbinhluan);

router.post('/binhluan/add',sanpham_api.addbl);

router.get('/hoadon',hoadon_api.list);

router.post('/hoadon/add',hoadon_api.addHd);

router.get('/xacnhan/:_id', async (req,res,next)=>{
        let objSP = new myMD.hoadonModel();
        objSP.trangthai="Đã hủy"
        objSP._id = req.params._id;
        try {  
            await myMD.hoadonModel.findByIdAndUpdate(req.params._id, objSP);
            return res.status(200).json(                  
                msg = 'Hủy thành công'             
         );
        } catch (error) {
            msg = 'Lỗi ghi CSDL: '+ error.message;
            console.log( error );
        }
    
  
});
 // đăng xuất

module.exports = router;
