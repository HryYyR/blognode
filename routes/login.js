const Router = require('koa-router');
let router = new Router;
const getDate = require("../util/date")    //获取当前时间
const fs = require('fs');
const { queryData } = require('../ADB/API.js') //常用sql
const sqlPromise = require('../util/promise')   //promise.all封装


const SqlString = require('sqlstring');  //防止sql注入
const Token = require('../util/jwt.js');  //检查和获取token
const md5 = require('md5-node')   //加密
const { generateSalt } = require('../util/generateSalt');
const { log } = require('console');

// 登录
router.post('/login', async (ctx, next) => {
    const reqData = ctx.request.body
    try {
        const regUser = `select * from user where username=${SqlString.escape(reqData.user)} `
        let userdata = await queryData(regUser)
        if (userdata.length == 0) {
            throw '账号不存在'
        }
        let checkpass = reqData.pass + md5(userdata[0].salt)
        if (checkpass === userdata[0].userpass) {
            const sql = `update user set loginnumber=loginnumber+1,lastlogintime='${getDate()}',userip='${reqData.ip}',userstatus=1 where username=${SqlString.escape(reqData.user)}`
            const updateRes = await queryData(sql)
            // console.log(userdata);
            const token = Token.encrypt({
                username: userdata[0].username,
                grade: userdata[0].grade
            }, '1d');
            ctx.body = {
                token: token,
                msg: "登录成功！",
                name: userdata[0].name,
                id: userdata[0].id,
                avatar: userdata[0].avatar,
                city:userdata[0].city,
                year:userdata[0].year,
                sex:userdata[0].sex,
            }
            console.log(getDate(), '登录成功', userdata[0].name);
        } else {
            throw '密码错误！'
        }
    } catch (e) {
        console.log(e);
        ctx.status = 201
        ctx.body = {
            msg: "账号或密码错误！"
        }
    }
    // const sql = `update user set loginnumber=loginnumber+1,lastlogintime='${getDate()}',userip='${ip}',userstatus=1 where username=${SqlString.escape(reqData.user)} and userpass=${SqlString.escape(reqData.pass)} `
    // const sql2 = `select * from user where username=${SqlString.escape(reqData.user)} and userpass = ${SqlString.escape(reqData.pass)} `
    // const resole = await Promise.all([sqlPromise(sql), sqlPromise(sql2)])
    // if (resole[1].length != 0) {
    //     const token = Token.encrypt({
    //         username: reqData.user,
    //         grade: resole[1][0].grade
    //     }, '1d');
    //     ctx.body = {
    //         token: token,
    //         msg: "登录成功！",
    //         name: resole[1][0].name,
    //         id: resole[1][0].id,
    //         avatar: resole[1][0].avatar,
    //     }
    //     console.log(getDate(), '登录成功', resole[1][0].name);
    // } else {
    //     throw '账号不存在！'
    // }

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

// QQ登录
router.post('/QQlogin', async (ctx, next) => {
    try {
        let { data, openID, accessToken, ip } = ctx.request.body
        let id=-1
        // console.log(data, openID, accessToken);
        if (!data || !openID || !accessToken) {
            throw '登陆失败！'
        }
        let sql0 = `select * from user where openId='${openID}'`
        let checkisrigister = await queryData(sql0)

        if (checkisrigister.length != 0) {
            userid=checkisrigister[0].id
            let UpdateUserInfo = `update user set lastlogintime='${getDate()}',userstatus=1,accessToken='${accessToken}' where openId='${openID}'`
            let update = await queryData(UpdateUserInfo)
        } else {
            let sql = `insert into user(name,username,userip,createtime,lastlogintime,userstatus,avatar,city,year,sex,isQQlogin,openId) values('${data.nickname}','${data.nickname}','${ip}','${getDate()}','${getDate()}',1,'${data.figureurl_1}','${data.province + data.city}','${data.year}','${data.gender}',1,'${openID}')`
            let res = await queryData(sql)
            if (res.affectedRows == 0) {
                throw '登陆失败！'
            }else{
                let sql = `select id from user  order by id desc limit 1`
                let resolve = await queryData(sql)
                id=resolve[0].id
            }
        }

        ctx.body = {
            msg: '登陆成功！',
            data: {
                id:id,
                name: data.nickname,
                sex: data.gender,
                city: data.province + data.city,
                headerurl: data.figureurl,
                year: data.year
            }
        }
    } catch (e) {
        ctx.status = 201
        ctx.body = {
            msg: '登陆失败！'
        }

    }
})


module.exports = router.routes();
