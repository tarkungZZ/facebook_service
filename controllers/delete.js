const pool = require(`../helpers/mysql`)

module.exports = async (req, res) => {

    try {

        await pool(`DELETE FROM users WHERE id =?`, [req.body.id])

        res.status(201).json({ message: 'Success.' })

    } catch (err) {

        res.status(400).json(err)

    }

}