const pool = require('../helpers/mysql')
const moment = require('moment')

module.exports = async (req, res) => {

    try {

        const { id, type, post = '', link = '' } = req.body

        const getConfig = await pool(`SELECT delay_min , delay_max FROM config WHERE id =?`, [1])

        let data = {}
        let postContent = []

        if (!id) { res.status(400).json({ message: 'Invalid facebook id.' }) }

        if (id) {

            const getData = await pool(`SELECT id , users_id , email, fb_password, two_fa , execute_path , status FROM facebook_account WHERE id =? `, [id])

            if (getData[0] && getData[0].status === 'working') { res.status(400).json({ message: `This facebook is still working.` }) }

            if (getData[0] && getData[0].status !== 'working') {

                if (type === 'like' || type === 'story') {

                    data = {
                        type,
                        users_id: getData[0].users_id,
                        id: getData[0].id,
                        email: getData[0].email,
                        fb_password: getData[0].fb_password,
                        two_fa: getData[0].two_fa,
                        execute_path: getData[0].execute_path,
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
                        users_id: getData[0].users_id,
                        id: getData[0].id,
                        email: getData[0].email,
                        fb_password: getData[0].fb_password,
                        two_fa: getData[0].two_fa,
                        execute_path: getData[0].execute_path,
                        delay_min: getConfig[0].delay_min * 1000,
                        delay_max: getConfig[0].delay_max * 1000,
                        postContent
                    }

                }

                if (type === 'share') {

                    data = {
                        type,
                        users_id: getData[0].users_id,
                        id: getData[0].id,
                        email: getData[0].email,
                        fb_password: getData[0].fb_password,
                        two_fa: getData[0].two_fa,
                        execute_path: getData[0].execute_path,
                        delay_min: getConfig[0].delay_min * 1000,
                        delay_max: getConfig[0].delay_max * 1000,
                        link,
                        post
                    }

                }

                // if (type === 'random') {

                //     const order = [1, 2]

                //     if (!post) {

                //         const getPost = await pool(`SELECT post FROM facebook_post ORDER BY RAND() LIMIT 1`)

                //         postContent.push(Object.values(getPost[0]))

                //         postContent = postContent.toString()

                //     } else { postContent = post }

                //     data = {
                //         type,
                //         id: getData[0].id,
                //         email: getData[0].email,
                //         fb_password: getData[0].fb_password,
                //         two_fa: getData[0].two_fa,
                //         execute_path: getData[0].execute_path,
                //         delay_min: getConfig[0].delay_min * 1000,
                //         delay_max: getConfig[0].delay_max * 1000,
                //         postContent,
                //         order
                //     }

                // }

                //console.log('Sending farm data to socket', data)

                //socket.emit('farming', data)

                const obj = {

                    work_at: moment().format('YYYY/MM/DD HH:mm:ss'),
                    status: 'working'

                }

                data.send = 0
                data.send_at = moment().format('YYYY/MM/DD HH:mm:ss')

                //console.log(data)

                await pool(`UPDATE facebook_account SET ? WHERE id =?`, [obj, id])

                await pool(`INSERT INTO queues SET ?`, [data])

                res.status(201).json({ message: 'Success' })

            }

        }

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}