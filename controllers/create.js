const pool = require('../helpers/mysql')
const encode = require('../helpers/encode')

module.exports = async (req, res) => {

    try {

        let { username, password, role } = req.body
        //password = encode(password)

        const checkUser = await pool(`SELECT id FROM users WHERE username =? AND password =?`, [username, password])

        if (checkUser[0]) { res.status(401).json({ message: `Username already exists.` }) }

        if (!checkUser[0]) {

            const body = { username, password, role }

            await pool(`INSERT INTO users SET ?`, [body])

            res.status(201).json({ message: `Success` })

        }

    } catch (err) {

        res.status(401).json(err)

    }

}