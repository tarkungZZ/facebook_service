const pool = require('../../helpers/mysql')

module.exports = async (req, res) => {

    let { limit = 10, page = 0, users_id } = req.query
    page = +page
    page = limit * page

    let condition = ''

    if (users_id) { condition = `WHERE users_id = ${users_id}` }

    const limitPage = `ORDER BY created_at ASC LIMIT ${limit} OFFSET ${page}`

    const query = 'SELECT id , email , fb_name ,email_password , fb_password , two_fa , status FROM facebook_account'

    await pool(query + ' ' + condition + ' ' + limitPage)
        .then(async (result) => {
            const total = await pool(`SELECT COUNT(id) AS total FROM facebook_account ${condition}`)
            res.status(200).json({ total: total[0].total, result })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })

}