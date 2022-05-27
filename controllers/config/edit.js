const pool = require('../../helpers/mysql')

module.exports = async (req, res) => {

    try {

        const checkEdit = await pool(`SELECT id FROM config LIMIT 1`)

        if (checkEdit[0]) {

            await pool(`UPDATE config SET ? WHERE id =?`, [req.body, 1])

            console.log(`Update config successful.`)

            res.status(201).json({ message: 'Success' })

        }

        if (!checkEdit[0]) {

            await pool(`INSERT INTO config SET ?`, [req.body])

            console.log(`Add config successful.`)

            res.status(201).json({ message: 'Success' })

        }

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}