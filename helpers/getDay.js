module.exports = () => {

    const date = new Date()

    let getDay = date.getDate()

    if (getDay < 10) { getDay = '0' + String(getDay) }

    return getDay

}