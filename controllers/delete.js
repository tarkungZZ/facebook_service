const pool = require(`../helpers/mysql`)

module.exports = async (req, res) => {

    try {

        const checkUser = await pool(`SELECT id FROM users WHERE id =?`, [req.body.id])

        if (!checkUser[0]) { res.status(400).json({ message: 'Invalid user id.' }) }

        if (checkUser[0]) {

            await pool(`DELETE FROM users WHERE id =?`, [checkUser[0].id])

            res.status(201).json({ message: 'Success.' })

        }

    } catch (err) {

        res.status(400).json(err)

    }

}