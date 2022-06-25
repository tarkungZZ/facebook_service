const pool = require(`../helpers/mysql`)
const encode = require(`../helpers/encode`)

module.exports = async (req, res) => {

    try {

        let { password } = req.body
        password = encode(password)

        await pool(`UPDATE users SET password =? WHERE id =?`, [password, req.body.id])

        res.status(201).json({ message: 'Success.' })

    } catch (err) {

        res.status(201).json(err)

    }

}