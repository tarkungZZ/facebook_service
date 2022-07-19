const pool = require('../../helpers/mysql')

module.exports = async (req, res) => {

    try {

        const { id } = req.body

        const checkID = await pool(`SELECT id FROM facebook_account WHERE id =?`, [id])

        if (!checkID[0]) { res.status(400).json({ message: `Invalid facebook id.` }) }

        if (checkID[0]) {

            await pool(`UPDATE facebook_account SET status =? WHERE id =?`, ['finish', id])

            console.log(`Update status facebook id ${id} successful.`)

            res.status(201).json({ message: 'Success.' })

        }

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}