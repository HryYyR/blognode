const Router = require('koa-router');
let router = new Router;
const getDate = require("../util/date")    //获取当前时间
const fs = require('fs');
const { queryData } = require('../ADB/API.js') //常用sql
const sqlPromise = require('../util/promise')   //promise.all封装


const formidable = require('formidable');  //处理图片
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
      console.log(getDate(),'上传图片成功！');
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


module.exports = router.routes();
