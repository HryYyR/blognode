const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间
const fs = require('fs');

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装


//后台获取所有评论数据
router.post('/getCommentData', async (ctx, next) => {
    const sql = 'select * from comment'
    try {
        const res = await queryData(sql)
        console.log(getDate(), '后台获取评论数据成功');
        ctx.body = res
    } catch (err) {
        ctx.response.status = 201
        ctx.body = {
            msg: err
        }
    }

})

module.exports = router.routes();
