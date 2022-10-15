const Router = require('koa-router');
let router = new Router;
const getDate = require("../util/date")    //获取当前时间
const fs = require('fs');
const { queryData } = require('../ADB/API.js') //常用sql
const sqlPromise = require('../util/promise')   //promise.all封装



const SqlString = require('sqlstring');  //防止sql注入
const Token = require('../util/jwt.js')  //检查和获取token
// 注册
router.post('/rigister', async (ctx, next) => {
    const req = ctx.request.body
    const checkuserisexistsql = `select * from user where username ='${req.user}' or email = '${req.email}'`
    const insertuser = `insert into user(name,username,userpass,email,lastlogintime,createtime,avatar) values(${SqlString.escape(req.user)},${SqlString.escape(req.user)},${SqlString.escape(req.pass)},${SqlString.escape(req.email)},'${getDate()}','${getDate()}','${`http://hyyyh.top:3001/avatar/${Math.round(Math.random() * 29 + 1)}.png`}')`
    try {
      const isexist = await queryData(checkuserisexistsql)
      // console.log(isexist);
      if (isexist.length > 0) {
        throw "用户已存在或邮箱已被使用"
      }
      const insert = await queryData(insertuser)
      if (insert.affectedRows > 0) {
        console.log(getDate(), '注册成功!');
  
        ctx.body = {
          msg: '注册成功！'
        }
      } else {
        throw "发生了未知的错误，请稍后重试"
      }
    } catch (e) {
      ctx.status = 201
      ctx.body = {
        msg: e
      }
    }
    // console.log(req);
  })

  
module.exports = router.routes();
