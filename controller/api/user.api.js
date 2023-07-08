var md = require('../../models/user.model');
const bcrypt = require("bcrypt");
exports.list = async (req, res, next) => {
    try {
        let dieu_kien = null;
        if (typeof (req.query.email) != 'undefined') {
            dieu_kien = { email: req.query.email };
        }
        let listUser = await md.userModel.find(dieu_kien);
        if (listUser) {
            return res.status(200).json(
                listUser
            );
        } else {
            return res.status(204).json(
                {
                    msg: 'Không có dữ liệu'
                }
            );
        }


    } catch (error) {
        return res.status(error.status)
            .json({
                msg: error.message
            });
    }

}
exports.login = async (req, res, next) => {
    try {
        const user = await md.userModel.findByCredentials(req.body.email, req.body.matkhau)
        if (!user) {
            return res.status(401)
                .json({ error: 'Sai thông tin đăng nhập' })
        }
        const token = await user.generateAuthToken();
        return res.status(200).json({ user, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message)
    }
}

exports.add = async (req, res, next) => {
    if(req.method =='POST'){
    try {
        const salt = await bcrypt.genSalt(10);
        const user = new md.userModel(req.body);
        user.matkhau = await bcrypt.hash(req.body.matkhau, salt);
        const token = await user.generateAuthToken();
        let new_u = await user.save()

        return res.status(201).json({ user: new_u, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}
    
}
exports.profile = (req, res, next) => {
    res.send(req.user);
    // res.json( {status: 1, msg: 'Trang thông tin'});
}


exports.logout = async (req, res, next) => {
    try {
        console.log(req.user);
        // req.user.generateAuthToken();
        req.user.token = null; //xóa token
        await req.user.save()
        return res.status(200).json({ message: 'Đăng xuất thành công' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
    
}
exports.edit_mk = async (req, res, next) => {
        let iduser = req.params.iduser; 
        let objUser = await md.userModel.findById(iduser);

        if(req.method =='POST'){
            let check_pass =  await bcrypt.compare(req.body.matkhau, objUser.matkhau)
            if(check_pass){     
                const random_character = await bcrypt.genSalt(15);
                let objUser = new md.userModel();
                objUser.matkhau= await bcrypt.hash(req.body.matkhau1, random_character);
                objUser._id = iduser;
                try {
                    await md.userModel.findByIdAndUpdate(iduser, objUser);
                    return res.status(200).json({ message: 'Đổi mật khẩu thành công' });
        
                } catch (error) {
                    res.status(500).send(error.message)
                    
                }
            }else{
                msg = 'Sai password';
            }
             
        }
}
