const pool = require('../../helpers/mysql')

module.exports = (req, res) => {

    const { id } = req.body

    pool(`DELETE FROM facebook_post WHERE id =?`, [id])
        .then(() => res.status(201).json({ message: 'Success' }))
        .catch((err) => { res.status(400).json(err) })

}