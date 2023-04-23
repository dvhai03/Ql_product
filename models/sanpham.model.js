var db = require('./db');
// dinh nghia cau truc khuon mau cho san pham 

const spSchema = new db.mongose.Schema(
    {
        tensp:{type : String ,require:true},
        id_theloai :{ type: db.mongose.Schema.Types.ObjectId ,ref:'theloaiModel'},
        anh :{type: String ,require: false},
        mota:{type : String ,require:false},
        giatien:{type : Number ,require:true}
    },

    {
        collection: 'san_pham'
    }
);

// tao model
let spModel = db.mongose.model('spModel', spSchema);
//--- lam tuong tu voi the loai
let theloaiSchema = new db.mongose.Schema({
    ten_tl:{type : String , require : true}
},
{
    collection:'the_loai_sp'
}
);
let theloaiModel = db.mongose.model('theloaiModel',theloaiSchema);
module.exports={spModel,theloaiModel}