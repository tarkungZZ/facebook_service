const { JWT_SECRET, JWT_EXPIRE } = require('../helpers/config')
const jwt = require('jsonwebtoken')
const pool = require('../helpers/mysql')
const verify = require('../helpers/verify')

module.exports = async (req, res) => {

    try {

        let { username, password } = req.body

        const checkLogin = await pool('SELECT * FROM users WHERE username =? AND password =? LIMIT 1', [username, password])

        if (!checkLogin[0]) {

            return res.status(401).json({ message: 'Invalid username or password.' })

        }

        if (checkLogin[0]) {

            const token = jwt.sign({
                user_id: checkLogin[0].id,
                username
            }, JWT_SECRET, { expiresIn: JWT_EXPIRE })

            return res.status(201).json({ token, user: verify(token) })

        }

    } catch (err) {

        console.log(err)

        res.status(401).json({ message: 'Unauthorized' })

    }

}