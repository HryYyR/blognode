const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间

const { queryData, selectData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装


// 前台获取博客数据
const addSortLabelName = require("../../util/addSortLabel")
router.get('/getBlogData', async (ctx, next) => {
  try {
    ctx.response.status = 200
    const sql = 'select name,id,container,createtime,createusername,isTitle,isShow,img,visitnumber,commentnum,laudnum,sort,label from blog '
    const res = await queryData(sql)
    if (res.length == 0) {
      throw '博客数据获取失败！'
      return
    }
    // 拿到页码和个数
    const { pageNum, num } = ctx.request.query
    if (pageNum == undefined || pageNum == 0 || num == undefined || num == 0) {
      return ctx.body = res
    }
    const resolve = res.slice(num * (pageNum - 1), num * pageNum)
    const data = await addSortLabelName(resolve)
    ctx.body = data
    console.log(getDate(), '前台获取博客数据成功', '分页:', pageNum, '数量:', num);
  } catch (e) {
    ctx.response.status = 201
    ctx.body = {
      msg: e,
    }
  }
});


router.get('/cs', async (ctx, next) => {
  let res = await selectData('blog', { isTitle: 1 })
  ctx.body = {
    data: res
  }
})

// 前台获取指定id博客详情数据
router.post('/getAssignBlogData', async (ctx, next) => {
  const id = ctx.request.body.id
  ctx.status = 200
  const sql = `update blog set visitnumber=visitnumber+1 where id=${id} `
  const sql2 = `select name,id,container,createtime,createuserid,createusername,img,label,sort,visitnumber,commentnum from blog where id =${id} `

  try {
    const resole = await Promise.all([sqlPromise(sql), sqlPromise(sql2)])

    ctx.body = {
      msg: "ok",
      data: resole[1]
    }
    console.log(getDate(), '前台获取指定id博客的数据成功');

  } catch (e) {
    ctx.status = 201
    return ctx.body = {
      msg: "信息获取失败！",
      data: e
    }
  }
})

// 获取指定id的分类和标签的博客数据
router.post('/getAssignSortLabelData', async (ctx, next) => {
  const req = ctx.request.body
  const { sortid, labelid } = ctx.request.body
  let arr = []
  // console.log(sortid, labelid);
  try {
    const sql = `select  * from blog`
    const resolve = await queryData(sql)
    // '没有分类，没有标签'
    if (sortid == 0 && labelid.length == 0) {
      arr = resolve
    }
    // '有分类，有标签'
    if (sortid != 0 && labelid.length != 0) {
      let filtersort = [] //用于存储分类筛选过后的数组，用于下一步筛选
      resolve.map(item => {
        if (item.sort == sortid) {
          filtersort.push(item)
        }
      })
      // console.log(filtersort);
      filtersort.map(item => {
        if (item.label.length == 1) {
          let havelabel = labelid.includes(item.label)
          if (havelabel) {
            arr.push(item)
          }
        } else {
          const label = item.label.split(',')
          // 思路：通过两个数组加起来的长度和去重之后的长度进行比较
          // 来判断是否有交集
          // 缺点：如果一个数组中有重复的值，可能会导致结果出错
          let havelabel = (label.length + labelid.length) !== new Set([...label, ...labelid]).size
          if (havelabel) { arr.push(item) }

        }
      })
    }
    // '有分类，没有标签'
    if (sortid != 0 && labelid.length == 0) {
      let filterArr = resolve.map(item => {
        if (item.sort == sortid) {
          arr.push(item)
        }
      })
    }
    // '没有分类，有标签'
    if (sortid == 0 && labelid.length != 0) {

      resolve.map(item => {
        if (item.label.length == 1) {
          let havelabel = labelid.includes(item.label)
          if (havelabel) {
            arr.push(item)
          }
        } else {
          const label = item.label.split(',')
          let havelabel = (label.length + labelid.length) !== new Set([...label, ...labelid]).size
          if (havelabel) { arr.push(item) }
        }
      })
    }
  } catch (err) {
    ctx.response.status = 201
    ctx.body = {
      error: err,
      msg: '数据获取失败！'
    }
    return
  }
  arr = await addSortLabelName(arr)
  console.log(getDate(), '获取指定id的分类标签的博客数据成功', sortid, labelid);
  ctx.body = {
    data: arr,
  }
})

module.exports = router.routes();
