var myMD = require('../models/user.model');
const bcrypt = require("bcrypt");
exports.user= async (req,res,next)=>{
    let objSwhere = {}; 
    if(typeof(req.query.key)!='undefined'){
        objSwhere.hoten = new RegExp(req.query.key,'i');
    }
    let sort = {};
    sort['hoten']=req.query.des;   
     if(req.method=='POST'){
        //Viet kiem tra hop le du lieu
    
        //tao model de gan du lieu post
        let objUser = new myMD.userModel();
        objUser.vaitro=req.body.vaitro;
        objUser.hoten=req.body.hoten;
        objUser.email=req.body.email;  
        const random_character = await bcrypt.genSalt(15);
        console.log('Random: ' + random_character);
        
        objUser.matkhau= await bcrypt.hash(req.body.matkhau, random_character);
        try {
            
            let new_user = await objUser.save();
           console.log(new_user);
        //    msg = 'Da them thanh cong' 
        } catch (error) {
            // msg = 'loi ghi csdl : '+ error.message  ;
            console.log(error);
        }

    }


    let getlistuser = await myMD.userModel.find(objSwhere).sort(sort);
    res.render('user/listUser',{arrUser:getlistuser});

   

}
exports.editUser =async(req,res,next)=>{
    let iduser = req.params.iduser; 

    let objUser = await myMD.userModel.findById(iduser);

    if(req.method =='POST'){
       
        let objUser = new myMD.userModel();
        objUser.vaitro=req.body.vaitro;
        objUser.hoten=req.body.hoten;
        objUser.email=req.body.email;
        objUser.matkhau=req.body.matkhau;
        objUser._id = iduser;
    


        // thực hiện ghi vào CSDL   
        try {
             
            await myMD.userModelo.findByIdAndUpdate(iduser, objUser);

            msg = 'Đã cập nhật thành công!';

        } catch (error) {
            msg = 'Lỗi ghi CSDL: '+ error.message;
            console.log( error );
        }

    }

    res.render('user/edit_user',{objUser:objUser});
}