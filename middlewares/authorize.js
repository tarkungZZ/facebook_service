const verify = require('../helpers/verify')

module.exports = async (req, res, next) => {

    let { authorization } = req.headers

    try {

        authorization = authorization.split(' ')[1]

        req.user = verify(authorization)

        next()

    } catch (error) {

        return res.status(401).json({ message: 'Unauthorized' })

    }

}