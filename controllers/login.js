const { JWT_SECRET, JWT_EXPIRE } = require('../helpers/config')
const jwt = require('jsonwebtoken')
const pool = require('../helpers/mysql')
const encode = require('../helpers/encode')
const verify = require('../helpers/verify')

module.exports = async (req, res) => {

    try {

        let { username, password } = req.body
        //password = encode(password)

        const checkExistUser = await pool(`SELECT id FROM users`)

        if (!checkExistUser[0]) {

            const body = {
                username,
                password,
                role: 'admin'
            }

            await pool(`INSERT INTO users SET ?`, [body])

            const token = jwt.sign({
                user_id: 1,
                username,
                role: 'admin'
            }, JWT_SECRET, { expiresIn: JWT_EXPIRE })

            return res.status(201).json({ token, user: verify(token) })

        } else {

            const checkLogin = await pool('SELECT * FROM users WHERE username =? AND password =? AND role = "admin" LIMIT 1', [username, password])

            if (!checkLogin[0]) {

                return res.status(400).json({ message: 'Username or password is invalid or user role is not admin.' })

            }

            if (checkLogin[0].role === 'admin') {

                const token = jwt.sign({
                    user_id: checkLogin[0].id,
                    username,
                    role: checkLogin[0].role
                }, JWT_SECRET, { expiresIn: JWT_EXPIRE })

                return res.status(201).json({ token, user: verify(token) })

            }

        }

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}