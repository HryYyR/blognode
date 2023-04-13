const fs = require('fs');
const path = require('path');

const cors = require('cors')

const Koa = require('koa');
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser'); //处理post
const SqlString = require('sqlstring');  //防止sql注入
const getDate = require("./util/date.js")    //获取当前时间

const app = new Koa();
const router = new Router();

const Token = require('./util/jwt')

const http = "http://localhost:3001/"
// cors
app.use(async (ctx, next) => {
  // ctx.set('Access-Control-Allow-Origin', 'http://localhost'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
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

app.use(async (ctx, next) => {
  ctx.request.body.ip = ctx.header['x-real-ip'] || '-1'

  // 添加日志
  if (ctx.request.body.ip) {
    fs.writeFile('./log/visitor_log.txt', `time:${getDate()}   IP:${ctx.header['x-real-ip']}`, (err) => {
      if (err) {
        return console.log(err)
      }
    })
  }
  let allowNext = 1  //是否允许放行
  // 判断黑名单
  if (ctx.request.body.ip) {
    let sql = `select * from blackList where ip=${ctx.request.body.ip}`
    const data = await queryData(sql)
    if (data.length > 0) {
      allowNext = -1
      ctx.status == 205
      ctx.body = {
        msg: '爬',
        data: data[0]
      }
    }
  }


  let authorization = ctx.request.header.authorization

  let url = ctx.request.url
  if (url.includes('/api/admin') && !url.includes('get')) {
    let isToken = Token.decrypt(authorization)
    // console.log(isToken);
    if (!isToken.token) {
      allowNext = -1
      ctx.status == 201
      ctx.body = {
        msg: 'token无效'
      }
    } else if (isToken.grade != 1) {
      allowNext = -1
      ctx.status == 201
      ctx.body = {
        msg: '权限不够'
      }
    }
  }
  allowNext == 1 && await next()

});

// 获取访问用户ip
router.get('/api/getip', async (ctx, next) => {
  if (ctx.header['x-real-ip']) {
    ctx.body = { ip: ctx.header['x-real-ip'] }
    console.log(getDate(), '获取ip成功', ctx.header['x-real-ip'])
  } else {
    ctx.status = 201
    ctx.body = {
      msg: 'ip获取失败!'
    }
  }
})

// 添加黑名单
router.post('/api/setIpBlackList', async (ctx, next) => {
  try {
    const { ip, type } = ctx.request.body.info
    if (ip!='null') {
      const sql = `select ip from blacklist where ip= ${ip} `
      const resolve = await queryData(sql)
      if (resolve.length >= 1) {
        const UPDATESQL = `update blacklist set ip = ip+1 where ip = ${ip}`
        await queryData(UPDATESQL)
      } else {
        const INSERTSQL = `insert into blackList(ip,type,createtime,number) values(${ip},${type},${getDate()},1) `
        await queryData(INSERTSQL)
        console.log(`添加ip:${ip} 到黑名单成功！`);
      }
      console.log(ip, type);
    }

    ctx.body = {
      data: "success",
    }

  } catch (e) {
    ctx.status = 201
    ctx.body = {
      data: "error"
    }
  }
})


const blog = require('./routes/blog/index')
router.use('/api', blog)

const comment = require('./routes/blog/comment')
router.use('/api', comment)

const laud = require('./routes/blog/laud')
router.use('/api', laud)

const interaction = require('./routes/blog/interaction.js')
router.use('/api', interaction)

const FriendLink = require('./routes/blog/FriendLink')
router.use('/api', FriendLink)

const Object = require('./routes/blog/object')
router.use('/api', Object)

const User = require('./routes/blog/user')
router.use('/api', User)

const admin = require('./routes/admin/index.js')
router.use('/api/admin', admin)

const adminlabel = require('./routes/admin/label.js')
router.use('/api/admin', adminlabel)

const adminsort = require('./routes/admin/sort.js')
router.use('/api/admin', adminsort)

const adminlaud = require('./routes/admin/laud.js')
router.use('/api/admin', adminlaud)

const adminuser = require('./routes/admin/user.js')
router.use('/api/admin', adminuser)

const admincomment = require('./routes/admin/comment.js')
router.use('/api/admin', admincomment)

const admingrade = require('./routes/admin/grade.js')
router.use('/api/admin', admingrade)

const adminrecord = require('./routes/admin/record.js')
router.use('/api/admin', adminrecord)

const adminfriendlink = require('./routes/admin/friendlink.js')
router.use('/api/admin', adminfriendlink)

const login = require('./routes/login.js')
router.use('/api', login)

const rigister = require('./routes/rigister.js')
router.use('/api', rigister)

const verifyToken = require('./routes/verifyToken.js')
router.use('/api', verifyToken)

const File = require('./routes/File.js');
const { queryData } = require('./ADB/API.js');
router.use('/api', File)


app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3001, () => {
  console.log(3001);
});