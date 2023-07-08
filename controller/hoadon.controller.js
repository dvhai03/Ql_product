var myMD = require('../models/hoadon.model');
exports.getlisthd= async (req,res,next)=>{
    let dieu_kien = null;
    if(typeof(req.query)!='undefined'){
        dieu_kien = req.query;
    }
    let listSP = await myMD.hoadonModel.find(dieu_kien).populate('id_sanpham').populate('id_user');
    console.log(dieu_kien);
    res.render('hoadon/listhd',{arrHd:listSP});
}