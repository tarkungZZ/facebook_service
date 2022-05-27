const pool = require('../../helpers/mysql')

module.exports = async (req, res) => {

    try {

        const { id } = req.body

        console.log(id)

        await pool(`DELETE FROM facebook_account WHERE id =?`, [id])

        console.log(`Delete facebook id ${id} success`)

        res.status(201).json({ message: `Success` })

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}