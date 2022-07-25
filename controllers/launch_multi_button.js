const pool = require('../helpers/mysql')

module.exports = async (req, res) => {

    const { id } = req.body

    const getAccounts = await pool(`SELECT id , email , fb_password , email_password , two_fa , execute_path FROM facebook_account WHERE users_id =?`, [id])

    if (!getAccounts[0]) { res.status(400).json({ message: 'Invalid users id.' }) }

    if (getAccounts[0]) {

        console.log(getAccounts)

        res.end()

    }

}