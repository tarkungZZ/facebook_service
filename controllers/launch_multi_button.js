const pool = require('../helpers/mysql')
const moment = require('moment')

module.exports = async (req, res) => {

    try {

        const { users_id, type, post = '', link = '' } = req.body

        let data = {}
        let postContent = []

        const getAccounts = await pool(`SELECT id , email , fb_password , email_password , two_fa , execute_path , status FROM facebook_account WHERE users_id =?`, [users_id])

        if (!getAccounts[0]) { res.status(400).json({ message: 'Invalid users id.' }) }

        if (getAccounts[0]) {

            //console.log(getAccounts)

            const getConfig = await pool(`SELECT delay_min , delay_max FROM config WHERE id =?`, [1])

            for (let i = 0; i < getAccounts.length; i++) {

                if (getAccounts[i].status !== 'working') {

                    if (type === 'like' || type === 'story') {

                        data = {
                            type,
                            id: getAccounts[i].id,
                            email: getAccounts[i].email,
                            fb_password: getAccounts[i].fb_password,
                            two_fa: getAccounts[i].two_fa,
                            execute_path: getAccounts[i].execute_path,
                            delay_min: getConfig[0].delay_min * 1000,
                            delay_max: getConfig[0].delay_max * 1000,
                        }

                    }

                    if (type === 'post') {

                        if (!post) {

                            const getPost = await pool(`SELECT post FROM facebook_post ORDER BY RAND() LIMIT 1`)

                            postContent.push(Object.values(getPost[0]))

                            postContent = postContent.toString()

                        } else { postContent = post }

                        data = {
                            type,
                            id: getAccounts[i].id,
                            email: getAccounts[i].email,
                            fb_password: getAccounts[i].fb_password,
                            two_fa: getAccounts[i].two_fa,
                            execute_path: getAccounts[i].execute_path,
                            delay_min: getConfig[0].delay_min * 1000,
                            delay_max: getConfig[0].delay_max * 1000,
                            postContent
                        }

                    }

                    if (type === 'share') {

                        data = {
                            type,
                            id: getAccounts[i].id,
                            email: getAccounts[i].email,
                            fb_password: getAccounts[i].fb_password,
                            two_fa: getAccounts[i].two_fa,
                            execute_path: getAccounts[i].execute_path,
                            delay_min: getConfig[0].delay_min * 1000,
                            delay_max: getConfig[0].delay_max * 1000,
                            link
                        }

                    }

                    const obj = {

                        work_at: moment().format('YYYY/MM/DD HH:mm:ss'),
                        status: 'working'

                    }

                    data.send = 0
                    data.send_at = moment().format('YYYY/MM/DD HH:mm:ss')

                    //console.log(data)

                    await pool(`UPDATE facebook_account SET ? WHERE status = 'finish' AND users_id =?`, [obj, users_id])

                    await pool(`INSERT INTO queues SET ?`, [data])

                    console.log(`Add new queues.`)

                }

            }

            res.status(201).json({ message: 'Success' })

        }

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}