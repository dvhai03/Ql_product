var md = require('../../models/hoadon.model');
exports.list = async (req, res, next)=>{
    try {
        let dieu_kien = null;
    if(typeof(req.query)!='undefined'){
        dieu_kien = req.query;
    }
        let listSP = await md.hoadonModel.find(dieu_kien).populate('id_sanpham').populate('id_user');
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
 exports.addHd = async (req, res, next) => {
    if(req.method =='POST'){
    try {

        let objhoadon = new md.hoadonModel()
        objhoadon.id_sanpham = req.body.id_sanpham;
        objhoadon.id_user = req.body.id_user;
        objhoadon.soluong = req.body.soluong;
        objhoadon.trangthai='Chưa xác nhận';
     let  newsp = await objhoadon.save();
        return res.status(201).json(newsp)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

    
}