function getRandomAvatar() {
    return `http://hyyyh.top:3001/avatar/${Math.round(Math.random() * 29 + 1)}.png`
}
module.exports =  getRandomAvatar