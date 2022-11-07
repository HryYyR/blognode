const Router = require('koa-router');
let router = new Router;
const getDate = require("../util/date")    //获取当前时间
const fs = require('fs');
const { queryData } = require('../ADB/API.js') //常用sql
const sqlPromise = require('../util/promise')   //promise.all封装


const Token = require('../util/jwt.js')  //检查和获取token
// 检查token是否有效
router.post('/verifyToken', async (ctx, next) => {
    ctx.status = 200
    let auth = ctx.request.header.authorization;    //http header的值
    auth = auth?.split(' ')[1];  //有"basic "的前缀，用split分割空格取值
    auth = Buffer.from(auth, 'base64').toString().split(':')[0];    //解析base64，转化为字符串，而且他有一个“:”的符号，需要分割
    const isToken = Token.decrypt(auth)
    if (isToken.token) {
      ctx.body = {
        token: true
      }
    } else {
      ctx.status = 201
      ctx.body = {
        token: false,
        msg: 'token无效！'
      }
    }
  })
  

module.exports = router.routes();
