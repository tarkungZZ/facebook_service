const { MD5_SECRET } = require('./config')
const md5 = require('md5')

module.exports = (password) => {

    return md5(MD5_SECRET + password)

}