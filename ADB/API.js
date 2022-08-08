const { rejects } = require('assert')
const query = require('./database.js')


const queryData = async (sql) =>{
    return new Promise((resolve,reject)=>{
        query(sql,(err,vals,fields)=>{
            if(err) throw err
            resolve(vals)
        })
    })

}

module.exports = {
    queryData
}