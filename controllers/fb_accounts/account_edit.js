const pool = require('../../helpers/mysql')

module.exports = async (req, res) => {

    try {

        await pool(`UPDATE facebook_account SET ? WHERE id =?`, [req.body, req.body.id])

        console.log(`Update facebook id ${req.body.id} success`)

        res.status(201).json({ message: `Success` })

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}