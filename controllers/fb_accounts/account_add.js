const pool = require('../../helpers/mysql')

module.exports = async (req, res) => {

    try {

        const body = {
            email: req.body.email,
            email_password: req.body.email_password,
            fb_password: req.body.fb_password,
            two_fa: req.body.two_fa,
            execute_path: 'C:\Program Files\Google\Chrome\Application\chrome.exe'
        }

        console.log(body)

        await pool(`INSERT IGNORE INTO facebook_account SET ?`, [body])

        console.log(`Insert new facebook account successful.`)

        res.status(201).json({ message: `Success` })

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}