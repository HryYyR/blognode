const jwt = require('jsonwebtoken');
const {secretKey} = require('../config.js')


const Token = {
    // 加密函数
    encrypt: function (data, time) { //data加密数据，time过期时间
        return jwt.sign(data, secretKey, {
            expiresIn: time
        }) //time的取值，'15d'表示15天,'2h'表示2小时
    },
    //   解密函数
    decrypt: function (token) {
        try {
            let data = jwt.verify(token, secretKey);
            return {
                token: true,
                id: data.username,
                grade:data.grade
            };
        } catch (e) {
            return {
                token: false,
                data: e
            }
        }
    }
}
module.exports = Token;