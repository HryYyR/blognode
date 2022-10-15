const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间
const fs = require('fs');

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装

// 后台获取分类数据
router.post('/getSortData', async (ctx, next) => {
    const sql = 'select * from blogsort'
    const res = await queryData(sql)
    if (res.length == 0) {
        ctx.response.status = 201
        ctx.body = {
            msg: '数据获取失败！'
        }
        return
    }
    console.log(getDate(), '后台获取分类数据成功');
    ctx.body = res
})



module.exports = router.routes();
