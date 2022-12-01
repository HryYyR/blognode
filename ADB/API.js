const query = require('./database.js')

const queryData = async (sql) => {
    return new Promise((resolve, reject) => {
        query(sql, (err, vals, fields) => {
            if (err) throw err
            resolve(vals)
        })
    })
}

function addField(field) {
    let str = ''
    str = field && field.toString()
    return str
}

function addWhere(where) {
    let str = ''
    for (let i in where) {
        str += ` ${i} = '${where[i]}' and`
    }
    str = str.slice(0, str.length - 3)
    return str
}

const selectData = async (database, where, field) => {
    let selectSql = "select "
    let Field = addField(field)
    let Where = addWhere(where)

    field ? selectSql += Field : selectSql += ' * '
    selectSql += ` from ${database} `
    where && (selectSql += ' where ' + Where)
    // console.log(selectSql);
    return await queryData(selectSql)
}

const deleteData = async (database, where) => {
    let deleteSql = "delete"
    let Where = addWhere(where)
    deleteSql += ` from ${database} `
    where && (deleteSql += ' where ' + Where)
    // console.log(deleteSql);
    return await queryData(deleteSql)
}

// set:修改工作，where：满足条件
const updateData = async (database, set, where) => {
    let updateSql = "update "
    let Set = addField(set)
    let Where = addWhere(where)

    updateSql += `${database} set `
    updateSql += Set
    updateSql += Where
    // console.log(updateSql);
    return await queryData(updateSql)

}

// field：添加记录中的字段，values:字段对应值
const insertData =async (database, field , values) => {
    let insertSql = "insert into "
    let Field = addField(field)
    let Values = addField(values)

    insertSql += `${database}(${Field}) values(${Values})`
    // console.log(insertSql);
    return await queryData(insertSql)

}
module.exports = {
    queryData,
    selectData
}