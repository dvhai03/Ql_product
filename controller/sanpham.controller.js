var myMD = require('../models/sanpham.model')
var fs = require('fs');

exports.getlistsp= async (req,res,next)=>{
  
    
    // lấy ds thể loại truyền ra view 
    let dieu_kien = null;
    if(typeof(req.query.id_theloai)!='undefined'){
        dieu_kien = {id_theloai: req.query.id_theloai};
    }
    let getlistTL = await myMD.theloaiModel.find();
    let getlistSP= await myMD.spModel.find(dieu_kien).populate('id_theloai');
    res.render('sanpham/listsp',{arrSp:getlistSP,arrTL:getlistTL});
}



exports.editSP= async (req,res,next)=>{
    let msg = '';
    let idsp = req.params.idsp; 

    let objSP = await myMD.spModel.findById(idsp);
    let listTL = await myMD.theloaiModel.find();

    if(req.method =='POST'){
    
      

        let objSP = new myMD.spModel();
  
        objSP.tensp=req.body.tensp;
        objSP.id_theloai=req.body.ten_tl;
        objSP.anh=req.file.originalname;
        objSP.mota=req.body.mota;
        objSP.giatien=req.body.giatien;
        fs.renameSync( req.file.path, "./public/images/"+ req.file.originalname);

        objSP._id = idsp; // dùng cho chức năng sửa

        // thực hiện ghi vào CSDL   
        try {
             
            await myMD.spModel.findByIdAndUpdate(idsp, objSP);
            res.redirect('/product');
            // msg = 'Đã cập nhật thành công!';

        } catch (error) {
            msg = 'Lỗi ghi CSDL: '+ error.message;
            console.log( error );
        }

    }

    res.render('sanpham/edit_sp',{msg:msg,objSP:objSP,listTL:listTL});
}
exports.addSP= async (req,res,next)=>{
    if(req.method=='POST'){
        //Viet kiem tra hop le du lieu
        //tao model de gan du lieu post
        let objSp = new myMD.spModel();
        objSp.tensp=req.body.tensp;
        objSp.id_theloai=req.body.ten_tl;
        objSp.anh=req.file.originalname;
        objSp.mota=req.body.mota;
        objSp.ngay = new Date();
        objSp.giatien=req.body.giatien;
        fs.renameSync( req.file.path, "./public/images/"+ req.file.originalname);
        try {
           
            let new_sp = await objSp.save();
            
         res.redirect('/product');
        //    msg = 'Da them thanh cong' 
        } catch (error) {
            // msg = 'loi ghi csdl : '+ error.message  ;
            console.log(error);
        }
    }
    let getlistTL = await myMD.theloaiModel.find();
    res.render('sanpham/add_sp',{arrTL:getlistTL});
}


exports.chiTietSP= async (req,res,next)=>{
    let msg = '';
    let idsp = req.params.idsp; 

    let objSP = await myMD.spModel.findById(idsp).populate('id_theloai');
    let listTL = await myMD.theloaiModel.find();


    res.render('sanpham/chitiet_sp',{objSP:objSP,listTL:listTL});
}

exports.addTL= async (req,res,next)=>{
    if(req.method=='POST'){
        //Viet kiem tra hop le du lieu
    
        //tao model de gan du lieu post
        let objTL = new myMD.theloaiModel();
        objTL.ten_tl = req.body.ten_tl;
    
        try {
            
            let new_TL = await objTL.save();
           console.log(new_TL);
        //    msg = 'Da them thanh cong' 
        } catch (error) {
            // msg = 'loi ghi csdl : '+ error.message  ;
            console.log(error);
        }
    }
    let getlistTL = await myMD.theloaiModel.find();
    res.render('sanpham/addTL',{arrTL : getlistTL});
}


exports.edit_theloai= async (req,res,next)=>{
    let msg = '';
    let idtl = req.params.idtl; 

    let objTL = await myMD.theloaiModel.findById(idtl);
   
    if(req.method =='POST'){
       
        let objTL = new myMD.theloaiModel();
        objTL.ten_tl = req.body.ten_tl;
      

        objTL._id = idtl; // dùng cho chức năng sửa

        // thực hiện ghi vào CSDL   
        try {
             
            await myMD.theloaiModel.findByIdAndUpdate(idtl, objTL);
            msg = 'Đã cập nhật thành công!';


        } catch (error) {
            msg = 'Lỗi ghi CSDL: '+ error.message;
            console.log( error );
        }

    }

    res.render('sanpham/edit_tl',{msg:msg ,objTL:objTL});
}

