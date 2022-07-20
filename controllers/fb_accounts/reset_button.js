const pool = require('../../helpers/mysql')

module.exports = async (req, res) => {

    try {

        const { id } = req.body

        await pool(`UPDATE facebook_account SET status =? WHERE id =?`, ['finish', id])

        res.status(201).json({ message: 'Success.' })

    } catch (err) {

        console.log(err)
        res.status(400).json(err)

    }

}