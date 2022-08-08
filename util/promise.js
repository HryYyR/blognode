const {queryData} = require('../ADB/API.js')
const sqlPromise = (sql) => {

    return new Promise((resolve, reject) => {
        queryData(sql).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })

}
module.exports = sqlPromise