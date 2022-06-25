const pool = require(`../helpers/mysql`)
const encode = require(`../helpers/encode`)

module.exports = async (req, res) => {

    try {

        await pool(`UPDATE users SET ? WHERE id =?`, [req.body, req.body.id])

        res.status(201).json({ message: 'Success.' })

    } catch (err) {

        res.status(201).json(err)

    }

}