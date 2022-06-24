const pool = require('../../helpers/mysql')

module.exports = async (req, res) => {

    let { limit = 10, page = 0 } = req.query
    page = +page
    page = limit * page

    const limitPage = `ORDER BY created_at DESC LIMIT ${limit} OFFSET ${page}`

    const query = 'SELECT id , post FROM facebook_post'

    await pool(query + ' ' + limitPage)
        .then(async (result) => {
            const total = await pool(`SELECT COUNT(id) AS total FROM facebook_post`)
            res.status(200).json({ total: total[0].total, result })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })

}