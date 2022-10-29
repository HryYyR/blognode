const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间
const fs = require('fs');

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装


const http = "https://hyyyh.top:3001/"
const base64Decode = require('../../util/base64decode')  //base64解码
// 后台添加博客
router.post('/addblog', async (ctx, next) => {
  let newDate = getDate()
  let newDateNum = new Date().getTime()
  let req = ctx.request.body
  let img = req.Img

  const labelArr = []
  const label = req.labellist.map(item => {
    if (item.check == 1) {
      labelArr.push(item.id)
    }
  })
  // console.log(labelArr);
  req.container = req.container.replace(/\"/g, "'")
  const dataBuffer = base64Decode(img)
  fs.writeFile(`./img/${newDateNum}.png`, dataBuffer, function (err) {
    if (err) return console.log(err);
  })
  ctx.response.status = 201
  ctx.body = {
    msg: '添加博客失败！'
  }

  // 插入数据
  const sql = `insert into blog(name,container,createtime,createusername,lastvisittime,visitnumber,isTitle,img,label,sort) values('${req.title}',"${req.container}",'${newDate}','admin','${newDate}',0,1,'${http + newDateNum}.png','${labelArr}','${req.sortID}')`
  // console.log(sql);
  const res = await queryData(sql)
  if (res.affectedRows == 0) return

  // 分类增加
  const sql2 = `update blogsort set num=num+1 where id = ${req.sortID} `
  const res2 = await queryData(sql2)
  if (res2.affectedRows == 0) return

  // 标签增加
  req.labellist.map(async (item, index) => {
    if (item.check) {
      const sql3 = `update bloglabel set num=num+1 where id = ${item.id} `
      const res3 = await queryData(sql3)
      if (res3.affectedRows == 0) return
    }
  })
  ctx.response.status = 200
  console.log(getDate(), '添加博客成功');
  ctx.body = res
})

// 后台修改博客
router.put('/editblog', async (ctx, next) => {
  ctx.status = 200
  let newDate = getDate()
  let req = ctx.request.body
  // console.log(req);
  req.container = req.container.replace(/\"/g, "'")

  const sql1 = `select * from blog where id= ${req.id}`
  const sql2 = `select * from bloglabel `
  const sql3 = `select * from blogsort`

  try {
    const resole = await Promise.all([
      await sqlPromise(sql1),
      await sqlPromise(sql2),
      await sqlPromise(sql3),
    ])
    if (resole[0].length != 0 && resole[1].length != 0 && resole[2].length != 0) {
      let { sort, label } = resole[0][0]

      let sql4 = `update bloglabel set num=num-1 where  id in (${label}) `
      let sql5 = `update blogsort set num=num-1 where  id in (${sort}) `
      let sql6 = `update bloglabel set num=num+1 where  id in (${req.labellist}) `
      let sql7 = `update blogsort set num=num+1 where  id in (${req.sortID}) `
      let sql8 = `update blog set name="${req.title}",container="${req.container}",sort="${req.sortID}",label="${req.labellist}" where id=${req.id} `

      const resole2 = await Promise.all([
        await sqlPromise(sql4),
        await sqlPromise(sql5),
        await sqlPromise(sql6),
        await sqlPromise(sql7),
        await sqlPromise(sql8),
      ])
      if (resole2[0].affectedRows == 0 && resole2[1].affectedRows == 0 && resole2[2].affectedRows == 0 && resole2[3].affectedRows == 0 && resole2[4].affectedRows == 0) {
        throw "修改失败！"
      }
      console.log(getDate(), "修改博客成功！");
      ctx.body = {
        msg: '修改成功！'
      }

    } else {
      throw "修改失败！"

    }
  } catch (e) {
    ctx.status = 201
    ctx.body = {
      msg: e
    }
  }
})


// 后台获取博客数据
router.post('/getBlogData', async (ctx, next) => {
  const sql = 'select * from blog'
  const res = await queryData(sql)
  if (res.length == 0) {
    ctx.response.status = 201
    ctx.body = {
      msg: '博客数据获取失败！'
    }
    return
  }
  ctx.response.status = 200

  let req = ctx.request.body
  const { pageNum, num } = req
  if (!pageNum || !num) {
    ctx.body = res
  }
  const resolve = res.slice(num * (pageNum - 1), num * pageNum)

  console.log(getDate(), '后台获取博客数据成功');
  ctx.body = {
    data: resolve,
    Total: res.length
  }
})


// 后台删除指定博客
router.post('/deleteblog', async (ctx, next) => {
  const id = ctx.request.body.id
  const sql = `select * from blog where id=${id}`

  try {
    // 判断博客是否存在
    const [blogData] = await queryData(sql)
    if (blogData.length == 0) throw false

    // 删除标签
    if (blogData.label.length > 1) {
      const label = blogData.label.split(",").map(item => {
        return parseInt(item)
      })
      for (let i = 0; i < label.length; i++) {
        const sql = `update bloglabel set num=num-1 where id = ${label[i]}`
        queryData(sql)
      }
    } else {
      const sql = `update bloglabel set num=num-1 where id = ${blogData.label}`
      queryData(sql)
    }
    const sql3 = `update blogsort set num=num-1 where id = ${blogData.sort}`
    const sql4 = `delete from comment where blogid = ${id}`
    const sql5 = `delete from laud where blogid = ${id}`
    const sql6 = `delete from blog where id = ${id}`
    const sql7 = `select * from blog`
    const resolve = await Promise.all(
      [
        await sqlPromise(sql3),
        await sqlPromise(sql4),
        await sqlPromise(sql5),
        await sqlPromise(sql6),
        await sqlPromise(sql7),
      ]
    )
    console.log(getDate(), '删除博客成功！', id);
    ctx.body = {
      msg: '删除成功！',
      data: resolve[4]
    }
  } catch (e) {
    ctx.status = 201
    ctx.body = {
      error: e,
      msg: '删除失败！'
    }
  }
})



module.exports = router.routes();
