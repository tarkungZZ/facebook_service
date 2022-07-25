const pool = require(`../helpers/mysql`)

module.exports = async (data) => {

    console.log(data)

    try {

        const checkFacebook = await pool(`SELECT id FROM facebook_account WHERE id =?`, [data.id])

        if (checkFacebook[0]) {

            // await pool(`UPDATE facebook_account SET status =? WHERE id =?`, [data.status, data.id])

            // console.log(`Update status for ${data.email} successful.`)

            await pool(`UPDATE bots SET work =? WHERE id =?`, [0, data.bot_id])

            console.log(`Update bots ${data.bot_name} successful.`)

        }

    } catch (err) { console.log(err) }

}