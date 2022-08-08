let getDate = () => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    if (day.toString().length == 1) {day = '0' + day}
    if (month.toString().length == 1) {month = '0' + month}
    if (hours.toString().length == 1) {hours = '0' + hours}
    if (minutes.toString().length == 1) {minutes = '0' + minutes}
    if (seconds.toString().length == 1) {seconds = '0' + seconds}

    let res = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return res

}

module.exports = getDate