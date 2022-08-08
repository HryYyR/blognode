const { queryData } = require('../ADB/API')
const getDate = require("../util/date")
const getRecordData = async () => {
    const sql = `select * from record`
    return await queryData(sql)
}

const addRecord = async (container, time) => {
    const sql = `insert into record(container,createtime) values('${container}','${getDate()}') `
    return   Promise.all(
       [ await queryData(sql),
        await getRecordData()]
        
    )

    




}

module.exports = {
    getRecordData,
    addRecord
}