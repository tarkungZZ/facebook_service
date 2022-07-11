const pool = require('../helpers/mysql')

module.exports = async (req, res) => {

    try {

        const { id } = req.query

        const getInfo = await pool(`SELECT id , status FROM facebook_account WHERE id =?`, [id])

        if (!getInfo[0]) { res.status(400).json({ message: `Invalid facebook id , account not found.` }) }

        if (getInfo[0]) { res.status(200).json({ status: getInfo[0].status }) }

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}