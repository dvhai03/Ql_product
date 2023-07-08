const mongose = require('mongoose');
mongose.connect( 'mongodb://127.0.0.1:27017/bh_306')
.catch((err)=>{
    console.log("Loi ket noi CSDL");
    console.log(err);
});

module.exports={mongose};