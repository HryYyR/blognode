const Router = require('koa-router');
let router = new Router;

const getDate = require("../../util/date")    //获取当前时间
const fs = require('fs');

const { queryData } = require('../../ADB/API.js')
const sqlPromise = require('../../util/promise')   //promise.all封装

const getRandomAvatar = require("../../util/getRandomAvatar")  //获取随机头像

const SqlString = require('sqlstring');  //防止sql注入




// 添加留言
router.post('/addinteraction', async (ctx, next) => {
    const { userid, username, container, islogin, isreply, replayuserid, userip } = ctx.request.body
    let getusersql, userdata, avatar
    if (userid != '-1') {
        getusersql = `select * from user where id=${userid}  `
        userdata = await queryData(getusersql)
        avatar = userdata[0].userdata
    }
    const insertsql = `insert into interaction(userid,username,userip,container,createtime,islogin,isreply,replyuserid,avatar) values(${SqlString.escape(userid) },'${username}','${userip || ''}',${SqlString.escape(container)},'${getDate()}','${islogin}',${isreply},${replayuserid}, '${avatar || getRandomAvatar()}' )`
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
        console.log(getDate(), '添加留言成功！', container);
    } catch (e) {
        ctx.status = 201
        ctx.body = {
            error: e,
        }
    }
})

// 获取所有留言
router.post('/getallinteraction', async (ctx, next) => {
    const sql = `select * from interaction`
    try {
        const resolve = await queryData(sql)
        let isreplydata = []
        let noreplydata = []
        resolve.forEach(item => {
            if (item.isreply == 0) {
                noreplydata.push(item)
            } else {
                isreplydata.push(item)
            }
        });
        noreplydata.forEach(noitem => {
            noitem.childen = []
            isreplydata.forEach(isitem => {
                if (isitem.replyuserid == noitem.id) {
                    noitem.childen.push(isitem)
                }
            })
        })
        console.log(getDate(), '获取所有留言成功！');
        ctx.body = {
            data: noreplydata
        }
    } catch (err) {
        ctx.status = 201
        ctx.body = {
            error: err
        }
    }
})



// 点赞留言
router.post('/luadinteraction', async (ctx, next) => {
    try {
        ctx.status = 200
        const req = ctx.request.body
        // console.log(req.interactionid, req.userid);
        const sql = `select * from interaction where id=${req.interactionid}`
        const sql2 = `select * from user where id=${req.userid}`
        const sql3 = `insert into interactionlaud(interactionid,userid,createtime) value(${req.interactionid},${req.userid},'${getDate()}') `
        const sql4 = ` update interaction set laudnum = laudnum+1 where id=${req.interactionid} `

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
router.post('/interactionhasBeenLaud', async (ctx, next) => {
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
router.post('/getassigninteractionlaud', async (ctx, next) => {
    const req = ctx.request.body
    const sql = `select * from interactionlaud where userid=${req.userid}`
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


module.exports = router.routes();
