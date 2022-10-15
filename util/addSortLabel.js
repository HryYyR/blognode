const {
    queryData
} = require('../ADB/API')


const addSortLabelName = async (data) => {
    const sortsql = `select * from blogsort`
    const labelsql = `select * from bloglabel`
    const sortData = await queryData(sortsql)
    const labelData = await queryData(labelsql)

    data.forEach(item => {
        item.labelname = []
        sortData.forEach(e => {
            if (e.id == item.sort) {
                item.sortname = e.name
            }
        });
        if(item.label?.length==1){
            labelData.forEach(e => {
                if(item.label == e.id){
                    item.labelname.push(e.name)
                }
            })
        }else{
            item.label = item.label?.split(',')
            // console.log(item.label);
            labelData.forEach(e => {
                item.label?.forEach(el=>{
                    if(el == e.id){
                        item.labelname.push(e.name)
                    }
                })
            })
        }
    })
    return data
}

module.exports = addSortLabelName