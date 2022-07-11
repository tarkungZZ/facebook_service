const pool = require(`../helpers/mysql`)

module.exports = async (data) => {

    console.log(data)

    try {

        const checkFacebook = await pool(`SELECT id FROM facebook_account WHERE id =?`, [data.id])

        if (checkFacebook[0]) {

            await pool(`UPDATE facebook_account SET status =? WHERE id =?`, [data.status, data.id])

            console.log(`Update status for ${data.email} successful.`)

        }

    } catch (err) { console.log(err) }

}