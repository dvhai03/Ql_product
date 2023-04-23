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