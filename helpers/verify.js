const { JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

module.exports = (token) => {

    try {

        return jwt.verify(token, JWT_SECRET)

    } catch (error) {

        throw 'Invalid token'

    }

}