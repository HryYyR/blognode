const base64Decode = (img)=>{
    let base64 = img.replace(/\s/g, "+");
  let base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
  let dataBuffer = Buffer.from(base64Data, 'base64')//新的用法 Buffer.from
  return dataBuffer
}

module.exports = base64Decode