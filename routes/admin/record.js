const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间
const fs = require('fs');

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装


const { getRecordData, addRecord } = require("../../API/record.js");
// 获取所有记录
router.post('/getRecordData', async (ctx, next) => {
  try {
    const resolve = await getRecordData()
    ctx.body = {
      data: resolve
    }
  } catch (e) {
    ctx.status = 201
    ctx.body = {
      msg: '获取记录失败！'
    }
  }
})

// 添加记录
router.post('/addRecord', async (ctx, next) => {
  ctx.status = 200
  const req = ctx.request.body
  try {
    const resolve = await addRecord(req.container)
    console.log(resolve[1]);
    ctx.body = {
      msg: '添加记录成功！',
      data: resolve[1]
    }
    return
  } catch (e) {
    ctx.status = 201
    ctx.body = {
      msg: '添加记录失败！'
    }

  }
})


module.exports = router.routes();
