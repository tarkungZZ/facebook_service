const pool = require('../../helpers/mysql')

module.exports = (req, res) => {

    pool(`INSERT INTO facebook_post SET ?`, [req.body])
        .then(() => res.status(201).json({ message: 'Success' }))
        .catch((err) => { res.status(400).json(err) })

}