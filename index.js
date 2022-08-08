const fs = require('fs');
const path = require('path');

const cors = require('cors')

const Koa = require('koa');
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser'); //处理post

const formidable = require('formidable');  //处理图片

const {
  queryData
} = require('./ADB/API.js')

const Token = require('./util/jwt.js')  //检查和获取token
const getDate = require("./util/date.js")    //获取当前时间
const base64Decode = require('./util/base64decode')  //base64解码
const sqlPromise = require('./util/promise')   //promise.all封装
const { getRecordData, addRecord } = require("./API/record.js");
const addSortLabelName = require("./util/addSortLabel")
const { log } = require('console');
const { throws } = require('assert');

const app = new Koa();
const router = new Router();

const http = "http://localhost:3001/"
// cors
app.use(async (ctx, next) => {
  // ctx.set('Access-Control-Allow-Origin', 'http://localhost'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.set('Access-control-Allow-Credentials', 'true');
  if (ctx.request.method === 'OPTIONS') { // 直接响应数据 （***** 这里是最重要的if ***）
    ctx.body = 200
  }
  await next();
});

app.use(bodyParser());
app.use(static(path.join(__dirname + '/img'),  // 开放的文件夹 __dirname为当前运行文件的目录  目前看来 只能开放文件夹 无法开放单独一个文件
  {
    index: false,       // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
    hidden: false,      // 是否同意传输隐藏文件
    defer: true,		   // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
  }
))

// 前台获取博客数据
router.get('/api/getBlogData', async (ctx, next) => {
  ctx.response.status = 200
  const sql = 'select name,id,container,createtime,createusername,isTitle,isShow,img,visitnumber,commentnum,laudnum,sort,label from blog'
  const res = await queryData(sql)
  if (res.length == 0) {
    ctx.response.status = 201
    ctx.body = {
      msg: '博客数据获取失败！'
    }
    return
  }
  // 拿到页码和个数
  const { pageNum, num } = ctx.request.query
  if (!pageNum || !num) {
    return ctx.body = res
  }
  const resolve = res.slice(num * (pageNum - 1), num * pageNum)
  const data = await addSortLabelName(resolve)
  ctx.body = data
  console.log(getDate(), '前台获取博客数据成功', '分页:', pageNum, '数量:', num);


})

// 前台获取指定id博客的数据
router.post('/api/getAssignBlogData', async (ctx, next) => {
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
      data: res
    }
  }
})


// 前台获取指定id博客评论
router.post('/api/getAssignComment', async (ctx, next) => {
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
router.post('/api/publishComment', async (ctx, next) => {
  const req = ctx.request.body
  ctx.status = 200


  const sql = `insert into comment(bloguserid,blogid,container,createtime,blogusername,blogname) value(${req.userId},${req.blogId},'${req.container}','${getDate()}','${req.userName}','${req.blogName}' ) `
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
      msg: '发表评论失败！'
    }
  }
})


// 前台点赞
router.post('/api/laud', async (ctx, next) => {
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
router.post('/api/getLaudNum', async (ctx, next) => {
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
router.post('/api/hasBeenLaud', async (ctx, next) => {
  const req = ctx.request.body
  const sql = `select * from laud where blogid=${req.blogid} and userid=${req.userid} `
  const res = await queryData(sql)
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


// 后台获取博客数据
router.post('/admin/getBlogData', async (ctx, next) => {
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

// 获取标签数据
router.post('/admin/getLabelData', async (ctx, next) => {
  const sql = 'select * from bloglabel'
  const res = await queryData(sql)
  if (res.length == 0) {
    ctx.response.status = 201
    ctx.body = {
      msg: '数据获取失败！'
    }
    return
  }
  ctx.response.status = 200
  console.log(getDate(), '获取标签数据成功');
  ctx.body = res
})





// 获取分类数据
router.post('/admin/getSortData', async (ctx, next) => {
  const sql = 'select * from blogsort'
  const res = await queryData(sql)
  if (res.length == 0) {
    ctx.response.status = 201
    ctx.body = {
      msg: '数据获取失败！'
    }
    return
  }
  console.log(getDate(), '获取分类数据成功');
  ctx.body = res
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


// 后台获取所有评论
router.post('/admin/getCommentData', async (ctx, next) => {
  const sql = 'select * from comment'
  const res = await queryData(sql)
  if (res.length == 0) {
    ctx.response.status = 201
    ctx.body = {
      msg: '数据获取失败！'
    }
    return
  }
  console.log(getDate(), '后台获取评论数据成功');
  ctx.body = res
})

// 后台获取所有点赞
router.post('/admin/getLaudData', async (ctx, next) => {
  const sql = 'select * from laud'
  const res = await queryData(sql)
  if (res.length == 0) {
    ctx.response.status = 201
    ctx.body = {
      msg: '数据获取失败！'
    }
    return
  }
  console.log(getDate(), '后台获取评论数据成功');
  ctx.body = res
})


// 添加博客
router.post('/admin/addblog', async (ctx, next) => {
  let newDate = getDate()
  // console.log(newDate);
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

// 删除指定博客
router.post('/admin/deleteblog', async (ctx, next) => {
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


// 添加留言
router.post('/api/addinteraction', async (ctx, next) => {
  const { userid, username, container, islogin } = ctx.request.body
  const insertsql = `insert into interaction(userid,username,container,createtime,islogin) values('${userid}','${username}','${container}','${getDate()}','${islogin}')`
  const selectsql = `select * from interaction`
  try {
    const insertresolve = await queryData(insertsql)
    const selectresolve = await queryData(selectsql)
    if (insertresolve.affectedRows == 0) {
      throw '添加失败！'
    }
    ctx.body = {
      data: selectresolve
    }
  } catch (e) {
    ctx.status = 201
    ctx.body = {
      error: e,
    }
  }
})

// 获取所有留言
router.post('/api/getallinteraction', async (ctx, next) => {
  const sql = `select * from interaction`
  try {
    const resolve = await queryData(sql)
    ctx.body = {
      data: resolve
    }
  } catch (err) {
    ctx.status = 201
    ctx.body = {
      error: err
    }
  }

})

// 点赞留言
router.post('/api/luadinteraction', async (ctx, next) => {
  ctx.status = 200
  const req = ctx.request.body
  console.log(req.interactionid, req.userid);
  const sql = `select * from interaction where id=${req.interactionid}`
  const sql2 = `select * from user where id=${req.userid}`
  const sql3 = `insert into interactionlaud(interactionid,userid,createtime) value(${req.interactionid},${req.userid},'${getDate()}') `
  const sql4 = ` update interaction set laudnum = laudnum+1 where id=${req.interactionid} `
  try {
    const resole = await Promise.all(
      [await sqlPromise(sql),
      await sqlPromise(sql2),
      await sqlPromise(sql3),
      await sqlPromise(sql4),
      ])
    if (resole[0].affectedRows != 0 && resole[1].affectedRows != 0 && resole[3].affectedRows != 0) {
      ctx.body = {
        msg: '点赞成功！'
      }
      console.log(getDate(), ' 留言点赞成功！');
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


// 判断用户是否已经点赞
router.post('/api/interactionhasBeenLaud', async (ctx, next) => {
  const req = ctx.request.body
  const sql = `select * from interactionlaud where userid=${req.userid} and interactionid=${req.interactionid} `
  const res = await queryData(sql)
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

// 获取指定用户 已点赞的评论 的id数组
router.post('/api/getassigninteractionlaud', async (ctx, next) => {
  const req = ctx.request.body
  const sql = `select * from interactionlaud where userid=${req.userid}`
  try{
    const resolve = await queryData(sql)
    ctx.body = {
      data:resolve
    }
  }catch(err){  
    ctx.status = 201
    ctx.body = {
      error:err
    }
  }


})


// 获取所有记录
router.post('/admin/getRecordData', async (ctx, next) => {
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
router.post('/admin/addRecord', async (ctx, next) => {
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

// 登录
router.post('/login', async (ctx, next) => {
  const reqData = ctx.request.body
  ctx.response.status = 200

  const sql = `update user set loginnumber=loginnumber+1,lastlogintime='${getDate()}',userstatus=1 where username='${reqData.user}' and userpass='${reqData.pass}' `
  const sql2 = `select * from user where username="${reqData.user}" and userpass = "${reqData.pass}" `
  try {
    const resole = await Promise.all([sqlPromise(sql), sqlPromise(sql2)])
    // console.log(resole[1][0].name);
    if (resole[1].length != 0) {
      const token = Token.encrypt({
        id: reqData.user
      }, '1d');
      ctx.body = {
        token: token,
        msg: "登录成功！",
        name: resole[1][0].name,
        id: resole[1][0].id
      }
      console.log(getDate(), '登录成功', resole[1][0].name);

    } else {
      throw '账号不存在！'
    }

  } catch (e) {
    ctx.status = 201
    ctx.body = {
      msg: "账号或密码错误！"
    }
  }

})

// 退出登录
router.post('/api/loginout', async (ctx, next) => {
  const req = ctx.request.body
  ctx.status = 200
  const sql = `update user set userstatus=0 where id=${req.userId} `
  try {
    const res = await queryData(sql)
    if (res.affectedRows != 0) {
      ctx.body = {
        msg: '退出登录成功！'
      }
      console.log(getDate(), '退出登录成功');

    }
  } catch (e) {
    ctx.status = 201
    ctx.body = {
      msg: '退出登录失败！'
    }
  }
})


// 检查token是否有效
router.post('/api/verifyToken', async (ctx, next) => {
  ctx.status = 200
  let auth = ctx.request.header.authorization;    //http header的值
  auth = auth.split(' ')[1];  //有"basic "的前缀，用split分割空格取值
  auth = Buffer.from(auth, 'base64').toString().split(':')[0];    //解析base64，转化为字符串，而且他有一个“:”的符号，需要分割

  const isToken = Token.decrypt(auth)
  //  console.log(isToken.token);
  if (isToken.token) {
    ctx.body = {
      token: true
    }
  } else {
    ctx.status = 201
    ctx.body = {
      token: false,
      msg: 'token无效！'
    }
  }
})


// 上传图片
router.post('/File', async (ctx, next) => {
  let newDateNum = new Date().getTime()
  const form = formidable({ multiples: true });
  await new Promise((resolve, reject) => {
    form.parse(ctx.req, (err, fields, files) => {
      fs.readFile(files["wangeditor-uploaded-image"].filepath, (err, data) => {
        if (err) {
          console.log("图片读取错误")
          return;
        }
        fs.writeFile(`./img/blogimg/${newDateNum}.png`, data, function (err) {
          if (err) return console.log(err);
        })
        // console.log(data);//输出十六进制数据
      })
      if (err) {
        reject(err);
        return;
      }
      ctx.set('Content-Type', 'application/json');
      ctx.status = 200;
      ctx.body = {
        "errno": 0, // 注意：值是数字，不能是字符串
        "data": {
          "url": `${http}blogimg/${newDateNum}.png`, // 图片 src ，必须
          "alt": "", // 图片描述文字，非必须
          "href": `${http}blogimg/${newDateNum}.png` // 图片的链接，非必须
        }
      }
      resolve();
    });
  });
  await next();
  return;
})

app.use(router.routes())
app.listen(3001, () => {
  console.log(3001);
});