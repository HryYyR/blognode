const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间
const fs = require('fs');

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装


//后台获取所有用户信息
router.post('/getUserData', async (ctx, next) => {
    const sql = `select * from user `
    try {
        const resolve = await queryData(sql)
        console.log(getDate(), '后台获取用户信息成功');
        ctx.body = {
            data: resolve
        }
    } catch (e) {
        ctx.status = 201
        ctx.body = {
            msg: e
        }
    }
})



module.exports = router.routes();
