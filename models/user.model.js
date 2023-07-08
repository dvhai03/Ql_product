var db = require('./db');
const jwt = require('jsonwebtoken');//  Cần chạy lệnh cài đặt: npm install jsonwebtoken --save
require('dotenv').config(); // su dung thu vien doc file env:   npm install dotenv --save
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt");
// dinh nghia cau truc khuon mau cho san pham 

const userSchema = new db.mongose.Schema(
    {
        vaitro:{type : String ,require:true},
        hoten :{ type: String ,require: true},
        email :{type: String ,require: true},
        matkhau:{type : String ,require:true},
        token: {type: String, required: false}
    },

    {
        collection: 'user'
    }
);

userSchema.methods.generateAuthToken = async function () {

    const user = this
    console.log(user)
    const token = jwt.sign({ _id: user._id, email: user.email }, chuoi_ky_tu_bi_mat)
    // user.tokens = user.tokens.concat({token}) // code này dành cho nhiều token, ở demo này dùng 1 token
    user.token = token;
    await user.save()
    return token
}

/**
* Hàm tìm kiếm user theo tài khoản
* @param email
* @param matkhau
* @returns {Promise<*>}
*/
userSchema.statics.findByCredentials = async (email, matkhau) => {
    const user = await userModel.findOne({ email })
    if (!user) {
        throw new Error({ error: 'Không tồn tại tai khoan nay' })
    }
    const isPasswordMatch = await bcrypt.compare(matkhau, user.matkhau)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Sai password' })
    }
    return user
}



// tao model
let userModel = db.mongose.model('userModel', userSchema);



//--- lam tuong tu voi the loai
module.exports={userModel}