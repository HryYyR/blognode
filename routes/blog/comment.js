const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装
const SqlString = require('sqlstring');  //防止sql注入


// 前台获取指定id博客评论
router.post('/getAssignComment', async (ctx, next) => {
    const req = ctx.request.body
    ctx.status = 200
    const sql = `select * from comment where blogid=${req.blogId}`
    try {
      const res = await queryData(sql)
      ctx.body = {
        data: res
      }
      console.log(getDate(), '前台获取指定id博客评论成功');
  
    } catch (e) {
      ctx.status = 201
      ctx.body = {
        msg: '评论获取失败！'
      }
    }
})

// 前台添加评论
router.post('/publishComment', async (ctx, next) => {
    const req = ctx.request.body
    ctx.status = 200
    console.log(req);
    const usersql = `select * from user where username = '${req.userName}' `
    const userdata = await queryData(usersql)
  if(userdata.length==0 ){
    throw '获取用户数据失败'
  }
    const sql = `insert into comment(bloguserid,blogid,container,createtime,blogusername,blogname,avatar) value(${req.userId},${req.blogId},${SqlString.escape(req.container) },'${getDate()}','${req.userName}','${req.blogName}','${userdata[0].avatar}' ) `
    const sql2 = `select * from comment where blogid=${req.blogId}  `
    const sql3 = `update blog set commentnum=commentnum+1 where  id=${req.blogId}`
    try {
      const result = await Promise.all(
        [await sqlPromise(sql),  //添加评论
        await sqlPromise(sql2),  //查询添加后的所有评论
        await sqlPromise(sql3),] //更新评论数+1
      )
      ctx.body = {
        data: result[1],
        msg: '发表成功！'
      }
      console.log(getDate(), ' 前台添加评论成功！');
  
    } catch (e) {
      ctx.status = 201
      ctx.body = {
        msg: e
      }
    }
})



module.exports = router.routes();
