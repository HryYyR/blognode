const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装


// 前台点赞
router.post('/laud', async (ctx, next) => {
    ctx.status = 200
    const req = ctx.request.body
    const sql = `select * from blog where id=${req.blogId}`
    const sql2 = `select * from user where id=${req.userId}`
    const sql3 = `insert into laud(blogid,userid,createtime) value(${req.blogId},${req.userId},'${getDate()}') `
    try {
      const resole = await Promise.all(
        [await sqlPromise(sql),
        await sqlPromise(sql2),
        await sqlPromise(sql3),
        ])
      if (resole[0].affectedRows != 0 && resole[1].affectedRows != 0) {
        ctx.body = {
          msg: '点赞成功！'
        }
        console.log(getDate(), ' 前台点赞成功！');
      } else {
        throw '身份验证失败！'
      }
    } catch (e) {
      ctx.status = 201
      ctx.body = {
        msg: '点赞失败！',
        error: e
      }
    }
})

// 获取指定id的点赞次数
router.post('/getLaudNum', async (ctx, next) => {
    ctx.status = 200
    const req = ctx.request.body
    const sql = `select *  from laud where blogid=${req.blogid}`
    try {
      if (!req.blogid) throw 'id不存在'
      const res = await queryData(sql)
      ctx.body = {
        length: res.length
      }
      console.log(getDate(), ' 指定id的点赞次数成功！');
  
    } catch (e) {
      ctx.status = 201
      ctx.body = {
        msg: '获取点赞信息失败！',
        error: e
      }
    }
  })

// 判断用户是否已经点赞
router.post('/hasBeenLaud', async (ctx, next) => {
    const req = ctx.request.body
    const sql = `select * from laud where blogid=${req.blogid} and userid=${req.userid} `
    const res = await queryData(sql)
    console.log(getDate(),'判断点赞成功');

    if (res.length == 0) {
      ctx.body = {
        is: true,
      }
    } else {
      ctx.status = 201
      ctx.body = {
        is: false,
      }
    }
  })

module.exports = router.routes();
