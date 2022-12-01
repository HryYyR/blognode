
const generateSalt = count => {
  const charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let returnStr = '';
  for (let i = 0; i < count; i++) {
    const index = Math.round(Math.random() * (charStr.length - 1));
    returnStr += charStr.substr(index, 1);
  }
  return returnStr;
};
module.exports = {  generateSalt };