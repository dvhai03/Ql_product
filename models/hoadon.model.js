var db = require('./db');
let hoadonSchema = new db.mongose.Schema(
    {
        id_sanpham:{type :db.mongose.Schema.Types.ObjectId,ref:'spModel'},
        id_user : {type :db.mongose.Schema.Types.ObjectId,ref:'userModel'},
        trangthai : {type: String,require:true},
        diachi : {type: String ,require:true},
        soluong : {type: Number,require:true}
    },
    {
        collection: 'hoa_don'
    }
);
let hoadonModel = db.mongose.model('hoadonModel', hoadonSchema);

module.exports={hoadonModel}