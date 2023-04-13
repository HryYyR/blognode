const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间
const fs = require('fs');

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise');   //promise.all封装
const { throws } = require('assert');


// 后台获取标签数据
router.post('/getLabelData', async (ctx, next) => {
    try {
        const sql = 'select * from bloglabel'
        const res = await queryData(sql)
        if (res.length == 0) {
            throw '数据获取失败！'
        }
        console.log(getDate(), '后台获取标签数据成功');
        ctx.body = res
    } catch (e) {
        ctx.response.status = 201
        ctx.body = {
            msg: e
        }
    }

})



// 后台删除标签数据
router.post('/deleteLabel', async (ctx, next) => {
    try {
        let { id } = ctx.request.body
        const sql = `select label from blog `
        const blogdata = await queryData(sql)
        console.log(blogdata);
        let arr = new Array(blogdata.length)
        for (let i in blogdata) {
            console.log(i);
        }
        ctx.body = {
            msg: 'ok'
        }
        return
        const sql1 = `delete from bloglabel where id = ${id}`
        const sql2 = `delete from object_bloglabel where label_id = ${id}`
        const res = await queryData(sql)
        if (res.affectedRows == 0) {
            throw '数据删除失败!'
        }
        console.log(getDate(), '后台删除标签数据成功');
        ctx.body = {
            msg: '数据删除成功!'
        }
    } catch (e) {
        ctx.response.status = 201
        ctx.body = {
            msg: e
        }
    }
})

// 后台添加标签数据
router.post('/addLabel', async (ctx, next) => {
    try {
        let { name, userid } = ctx.request.body
        const sql = `insert into bloglabel(name,addtime,adduser) values('${name}','${getDate()}',${userid}) `
        const res = await queryData(sql)
        if (res.affectedRows == 0) {
            throw '数据添加失败！'
        }
        console.log(getDate(), '后台添加标签数据成功');
        ctx.body = {
            msg: '数据添加成功!'
        }
    } catch (e) {
        ctx.response.status = 201
        ctx.body = {
            msg: e
        }
    }
})





module.exports = router.routes();
