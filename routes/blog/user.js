const Router = require('koa-router');
let router = new Router;
const fs = require('fs');
const { queryData } = require('../../ADB/API') //常用sql
const sqlPromise = require('../../util/promise')   //promise.all封装


const SqlString = require('sqlstring');  //防止sql注入
const Token = require('../../util/jwt.js');  //检查和获取token
const md5 = require('md5-node')   //加密
const { generateSalt } = require('../../util/generateSalt');
const { log } = require('console');
const { ifError, throws } = require('assert');



router.post('/getAssignUserData', async (ctx, next) => {
    try {
        let {userid} =ctx.request.body
        // let authorization = ctx.request.header.authorization
        // let isToken = await Token.decrypt(authorization)
        // console.log(isToken);
        let resolve
        // if (isToken.token) {
            let sql = `select username,email,avatar,city,year,sex from user where id=${parseInt(userid)} `
            resolve = await queryData(sql)
            if(resolve.Length==0){
                throw '用户不存在！'
            }
        // } else {
            // throw '用户信息获取失败！'
        // }
        ctx.body = {
            msg: "获取用户基本信息成功！",
            data: resolve[0]
        }
    } catch (e) {
        ctx.status = 201
        ctx.body = {
            code: 201,
            msg: e
        }
    }
})


router.post('/editAssignUserData', async (ctx, next) => {
    try {
        let { userid, username, email, sex, year, city } = ctx.request.body
        let sql = `update user set email=${SqlString.escape(email)},sex=${SqlString.escape(sex)},city=${SqlString.escape(city)},year=${SqlString.escape(year)} where id = ${userid} and username ='${username}' `
        let resolve = await queryData(sql)
        ctx.body = {
            code: 200,
            msg: '修改成功！'
        }
    } catch (e) {
        ctx.status = 201
        ctx.body = {
            code: 201,
            msg: e
        }
    }


})
module.exports = router.routes();
