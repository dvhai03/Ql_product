var myMD = require('../models/user.model');
const bcrypt = require('bcrypt');
var fs = require('fs');
exports.login= async (req,res,next)=>{
    let msg = '';
    if(req.method == 'POST'){
        try {
            let objU = await myMD.userModel.findOne({email: req.body.email});
            console.log(objU);
            if(objU != null ){
                // tồn tại username ==> kiểm tra passwd
                let check_pass =  await bcrypt.compare(req.body.matkhau, objU.matkhau)
                if(check_pass) {
                    if(objU.vaitro=="Quan Li"){
                        req.session.userlogin = objU; 
                        // chuyển trang về trang quản trị
                        return res.redirect('/home');
                    }else{
                        msg = 'Tài khoản: ' + req.body.email+'khong co quyen truy cap';
                    }
                    
                }else{
                    msg = 'Sai password';
                }

            }else{
                msg = 'Không tồn tại tài khoản: ' + req.body.email;
            }

        } catch (error) {
            msg = error.message;
        }
    } 
    res.render('login',{msg:msg});
}
exports.home=(req,res,next)=>{

    res.render('home');
}
exports.reg= async (req,res,next)=>{
    let msg = '';

    if(req.method=='POST'){
        console.log(req.body);
        //kiểm tra hợp lệ
        if(req.body.matkhau != req.body.matkhau2){
            msg = 'Xác nhận password không đúng';
            return res.render('user/reg', {msg:msg});
        }
        // nếu có kiểm tra khác thì viết ở đây...

        //lưu CSDL
        try {
            let objU = new myMD.userModel();
            objU.hoten = req.body.hoten;
            objU.email = req.body.email;
           
            // xử lý mã hoá passwd
            const random_character = await bcrypt.genSalt(15);
            console.log('Random: ' + random_character);
            

            objU.matkhau = await bcrypt.hash(req.body.matkhau, random_character);
           
            objU.vaitro = req.body.vaitro;

            await objU.save();
            msg = 'Đăng ký thành công';

        } catch (error) {
            msg = "Lỗi: " + error.message;
        }

    }

    res.render('signup',{msg:msg});
}