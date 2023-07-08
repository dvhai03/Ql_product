var md = require('../../models/sanpham.model');

exports.list = async (req, res, next)=>{
    try {
        let objSwhere = {}; 
    if(typeof(req.query.key)!='undefined'){
        objSwhere.tensp = new RegExp(req.query.key,'i');
    }
        let listSP = await md.spModel.find(objSwhere).populate('id_theloai');
        if(listSP){
            return res.status(200).json(                  
                   listSP             
            );
        }else{
            return res.status(204).json(
                {
                    msg: 'Không có dữ liệu'
                }
            );
        }
 
    } catch (error) {
        return res.status( error.status  )
                    .json({
                        msg: error.message
                    });
    }
 
 }
 exports.chi_tiet = async (req, res, next)=>{
    let idsp = req.params.id_sp; 
    try {
        let listSP = await md.spModel.findById(idsp).populate('id_theloai');
        if(listSP){
            return res.status(200).json(                  
                  listSP          
            );
        }else{
            return res.status(204).json(
                {
                    msg: 'Không có dữ liệu'
                }
            );
        }
 
    } catch (error) {
        return res.status( error.status  )
                    .json({
                        msg: error.message
                    });
    }
 
 }
 exports.listgiohang = async (req, res, next)=>{
    try {
        let dieu_kien = null;
        if(typeof(req.query)!='undefined'){
            dieu_kien =req.query;
        }
        let listSP = await md.giohangModel.find(dieu_kien).populate('id_sanpham').populate('id_user');
        if(listSP){
            return res.status(200).json(                  
                   listSP             
            );
        }else{
            return res.status(204).json(
                {
                    msg: 'Không có dữ liệu'
                }
            );
        }
 
    } catch (error) {
        return res.status( error.status  )
                    .json({
                        msg: error.message
                    });
    }
 
 }

 

 exports.addgh = async (req, res, next) => {
    if(req.method =='POST'){
    try {

        let objgiohang = new md.giohangModel()
        objgiohang.id_sanpham = req.body.id_sanpham;
        objgiohang.id_user = req.body.id_user;
        objgiohang.soluong = req.body.soluong; 
     let  newsp = await objgiohang.save();
        return res.status(201).json(newsp)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

    
}
exports.deletegh =async(req,res,next)=>{
    try {
        await md.giohangModel.findByIdAndDelete({_id:req.params.id});
        return res.status(200).json({msg : 'xoa thanh cong'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}
exports.listbinhluan = async (req, res, next)=>{
    try {
        let dieu_kien = null;
        if(typeof(req.query.key)!='undefined'){
            dieu_kien = {id_sanpham: req.query.key};
        }
        let listSP = await md.binhluanModel.find(dieu_kien).populate('id_sanpham').populate('id_user');
        if(listSP){
            return res.status(200).json(                  
                   listSP             
            );
        }else{
            return res.status(204).json(
                {
                    msg: 'Không có dữ liệu'
                }
            );
        }
 
    } catch (error) {
        return res.status( error.status  )
                    .json({
                        msg: error.message
                    });
    }
 
 }
 exports.addbl = async (req, res, next) => {
    if(req.method =='POST'){
    try {
        let objcomment = new md.binhluanModel()
        objcomment.id_sanpham = req.body.id_sanpham;
        objcomment.id_user = req.body.id_user;
        objcomment.binhluan = req.body.binhluan; 
     let  newsp = await objcomment.save();
        return res.status(201).json({
            msg :"Thanh cong"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

    
}
