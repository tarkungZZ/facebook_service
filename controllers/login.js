const { JWT_SECRET, JWT_EXPIRE } = require('../helpers/config')
const jwt = require('jsonwebtoken')
const pool = require('../helpers/mysql')
const encode = require('../helpers/encode')
const verify = require('../helpers/verify')

module.exports = async (req, res) => {

    try {

        let { username, password } = req.body
        password = encode(password)

        const checkExistUser = await pool(`SELECT id FROM users`)

        if (!checkExistUser[0]) {

            const body = {
                username,
                password
            }

            await pool(`INSERT INTO users SET ?`, [body])

            const token = jwt.sign({
                user_id: 1,
                username
            }, JWT_SECRET, { expiresIn: JWT_EXPIRE })

            return res.status(201).json({ token, user: verify(token) })

        } else {

            const checkLogin = await pool('SELECT * FROM users WHERE username =? AND password =? LIMIT 1', [username, password])

            if (!checkLogin[0]) {

                return res.status(400).json({ message: 'Invalid username or password.' })

            }

            if (checkLogin[0]) {

                // let body = req.body
                // body.phone = checkLogin[0].phone

                // delete body.username
                // delete body.password

                //await pool("INSERT INTO login_logs SET ? ", body)

                const token = jwt.sign({
                    user_id: checkLogin[0].id,
                    username
                }, JWT_SECRET, { expiresIn: JWT_EXPIRE })

                return res.status(201).json({ token, user: verify(token) })

            }

        }

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}