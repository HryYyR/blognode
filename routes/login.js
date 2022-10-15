const Router = require('koa-router');
let router = new Router;
const getDate = require("../util/date")    //获取当前时间
const fs = require('fs');
const { queryData } = require('../ADB/API.js') //常用sql
const sqlPromise = require('../util/promise')   //promise.all封装


const SqlString = require('sqlstring');  //防止sql注入
const Token = require('../util/jwt.js')  //检查和获取token
// 登录
router.post('/login', async (ctx, next) => {
    console.log(1);
    const reqData = ctx.request.body
    ctx.response.status = 200
    let ip
    if (ctx.header['x-real-ip']) {
        ip = ctx.header['x-real-ip']
    }
    const sql = `update user set loginnumber=loginnumber+1,lastlogintime='${getDate()}',userip='${ip}',userstatus=1 where username=${SqlString.escape(reqData.user)} and userpass=${SqlString.escape(reqData.pass)} `
    const sql2 = `select * from user where username=${SqlString.escape(reqData.user)} and userpass = ${SqlString.escape(reqData.pass)} `
    try {
        const resole = await Promise.all([sqlPromise(sql), sqlPromise(sql2)])
        if (resole[1].length != 0) {
            const token = Token.encrypt({
                id: reqData.user
            }, '1d');
            ctx.body = {
                token: token,
                msg: "登录成功！",
                name: resole[1][0].name,
                id: resole[1][0].id
            }
            console.log(getDate(), '登录成功', resole[1][0].name);
        } else {
            throw '账号不存在！'
        }
    } catch (e) {
        ctx.status = 201
        ctx.body = {
            msg: "账号或密码错误！"
        }
    }
})


// 退出登录
router.post('/loginout', async (ctx, next) => {
    const req = ctx.request.body
    ctx.status = 200
    const sql = `update user set userstatus=0 where id=${req.userId} `
    let i = `  ${`http://hyyyh.top:3001/avatar/${Math.round(Math.random() * 29 + 1)}.png`}   `
    try {
        const res = await queryData(sql)
        if (res.affectedRows != 0) {
            ctx.body = {
                msg: '退出登录成功！'
            }
            console.log(getDate(), '退出登录成功');
        }
    } catch (e) {
        ctx.status = 201
        ctx.body = {
            msg: '退出登录失败！'
        }
    }
})


module.exports = router.routes();
