const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装
const SqlString = require('sqlstring');  //防止sql注入


// 获取所有项目数据
router.post('/getAllobjectData', async (ctx, next) => {
    try {
        let objsql = `select * from object `
        let objresolve = await queryData(objsql)
    
        for (let i = 0; i < objresolve.length; i++) {
            let sql = ` select b.name,ol.label_id from bloglabel b,object_bloglabel ol where ol.obj_id=${objresolve[0].id} and ol.label_id=b.id;`
            let resolve = await queryData(sql)
            objresolve[i].tipList = resolve
        }
        console.log(getDate(),'获取所有项目数据成功！');
        ctx.body = {
            data: objresolve
        }
    } catch (e) {
        ctx.status=201
        ctx.body={
            data:[],
            msg:'获取数据失败！',
            e:e
        }
    }
})



module.exports = router.routes();
