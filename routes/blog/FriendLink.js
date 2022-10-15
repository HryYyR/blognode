const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间
const fs = require('fs');

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装


const SqlString = require('sqlstring');  //防止sql注入
// 申请友联
router.post('/applyFriendLink', async (ctx, next) => {
    const { website, icon, email, container, userid, username, ip } = ctx.request.body
    ctx.response.status = 200
    let insertsql = ` insert into friendlink(website,icon,email,container,userid,username,userip) value('${website}',${SqlString.escape(icon)},${SqlString.escape(email)},${SqlString.escape(container)},${SqlString.escape(userid)},${SqlString.escape(username)},${ip}) `

    try {
        const insertresolve = await queryData(insertsql)
        if (insertresolve.affectedRows == 0) {
            throw '友联申请失败！'
        }
        ctx.body = {
            msg: '友联申请成功！'
        }
        console.log(getDate(), '申请友链成功！');
    } catch (err) {
        ctx.response.status = 201
        crypto.body = {
            msg: err
        }
    }
})

// 获取所有友链数据
router.post('/getFriendLink', async (ctx, next) => {
    ctx.response.status = 200
    let sql = `select id,website,icon,email,container,userid,username,isshow from friendlink`
    try {
        const resolve = await queryData(sql)
        console.log(getDate(), '获取友链数据成功！');
        ctx.body = {
            data: resolve
        }
    } catch (error) {
        ctx.response.status = 201

        ctx.body = {
            msg: '友联数据获取失败！'
        }
    }
})


module.exports = router.routes();
