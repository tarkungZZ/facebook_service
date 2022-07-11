const pool = require('../../helpers/mysql')

module.exports = async (req, res) => {

    try {

        const body = {
            email: req.body.email,
            email_password: req.body.email_password,
            fb_password: req.body.fb_password,
            two_fa: req.body.two_fa,
            users_id: req.body.users_id
        }

        console.log(body)

        const checkUsers = await pool(`SELECT id FROM users WHERE id =?`, [body.users_id])

        if (!checkUsers[0]) { res.status(400).json({ message: `Invalid users id.` }) }

        if (checkUsers[0]) {

            await pool(`INSERT IGNORE INTO facebook_account SET ?`, [body])

            console.log(`Insert new facebook account successful.`)

            res.status(201).json({ message: `Success` })

        }

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}