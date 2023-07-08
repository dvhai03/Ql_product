var db = require('./db');

// dinh nghia cau truc khuon mau cho san pham 
const spSchema = new db.mongose.Schema(
    {
        tensp:{type : String ,require:true},
        id_theloai :{ type: db.mongose.Schema.Types.ObjectId ,ref:'theloaiModel'},
        anh :{type: String ,require: false},
        mota:{type : String ,require:false},
        ngay:{type:Date,require:false},
        giatien:{type : Number ,require:true}
    },

    {
        collection: 'san_pham'
    }
);
let spModel = db.mongose.model('spModel', spSchema);

let giohangSchema = new db.mongose.Schema(
    {
        id_sanpham:{type :db.mongose.Schema.Types.ObjectId,ref:'spModel'},
        id_user : {type :db.mongose.Schema.Types.ObjectId,ref:'userModel'},
        soluong : {type: Number,require:true}
    },
    {
        collection: 'gio_hang'
    }



);
let giohangModel = db.mongose.model('giohangModel', giohangSchema);

// tao model

//--- lam tuong tu voi the loai
let theloaiSchema = new db.mongose.Schema({
    ten_tl:{type : String , require : true}
},  
{
    collection:'the_loai_sp'
}
);
let theloaiModel = db.mongose.model('theloaiModel',theloaiSchema);

let binhluanSchema = new db.mongose.Schema(
    {
    id_sanpham:{type :db.mongose.Schema.Types.ObjectId,ref:'spModel'},
    id_user : {type :db.mongose.Schema.Types.ObjectId,ref:'userModel'},
    binhluan : {type : String , require : true}

   },

   {
    collection:'table_binhluan'
   }

);
let binhluanModel = db.mongose.model('binhluanModel',binhluanSchema);


module.exports={spModel,theloaiModel,giohangModel,binhluanModel}    