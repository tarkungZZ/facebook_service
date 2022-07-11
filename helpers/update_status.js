const pool = require(`../helpers/mysql`)

module.exports = async (data) => {

    try {

        await pool(`UPDATE facebook_account SET status =? WHERE id =?`, [data.status, data.id])

        console.log(`Update status for ${data.email} successful.`)

    } catch (err) { console.log(err) }

}