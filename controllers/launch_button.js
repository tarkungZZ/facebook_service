const pool = require('../helpers/mysql')
const { SOCKET_IP, SOCKET_PORT } = require('../helpers/config')
const io = require('socket.io-client')
const socket = io.connect(`http://${SOCKET_IP}:${SOCKET_PORT}`)

module.exports = async (req, res) => {

    try {

        const { id, type, post = '', link = '', limit = 5 } = req.body

        const getConfig = await pool(`SELECT delay_min , delay_max FROM config WHERE id =?`, [1])

        let data = {}
        let postContent = []

        if (!id) {

            // const getData = await pool(`SELECT email, fb_password, two_fa , execute_path FROM facebook_account ORDER BY created_at DESC LIMIT ?`, [limit])

            // if (type === 'like' || type === 'story') {

            //     data = {
            //         type,
            //         id: null,
            //         getData,
            //         delay_min: getConfig[0].delay_min * 1000,
            //         delay_max: getConfig[0].delay_max * 1000,
            //     }

            // }

            // if (type === 'share') {

            //     data = {
            //         type,
            //         id: null,
            //         getData,
            //         delay_min: getConfig[0].delay_min * 1000,
            //         delay_max: getConfig[0].delay_max * 1000,
            //         link
            //     }

            // }

            // console.log('Sending farm data to socket', data)

            // socket.emit('farming', data)

            res.status(400).json({ message: 'Invalid facebook id.' })

        }

        if (id) {

            const getData = await pool(`SELECT id , email, fb_password, two_fa , execute_path FROM facebook_account WHERE id =? `, [id])

            if (getData[0]) {

                if (type === 'like' || type === 'story') {

                    data = {
                        type,
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
                        id: getData[0].id,
                        email: getData[0].email,
                        fb_password: getData[0].fb_password,
                        two_fa: getData[0].two_fa,
                        execute_path: getData[0].execute_path,
                        delay_min: getConfig[0].delay_min * 1000,
                        delay_max: getConfig[0].delay_max * 1000,
                        link
                    }

                }

                if (type === 'random') {

                    const order = [1, 2]

                    if (!post) {

                        const getPost = await pool(`SELECT post FROM facebook_post ORDER BY RAND() LIMIT 1`)

                        postContent.push(Object.values(getPost[0]))

                        postContent = postContent.toString()

                    } else { postContent = post }

                    data = {
                        type,
                        id: getData[0].id,
                        email: getData[0].email,
                        fb_password: getData[0].fb_password,
                        two_fa: getData[0].two_fa,
                        execute_path: getData[0].execute_path,
                        delay_min: getConfig[0].delay_min * 1000,
                        delay_max: getConfig[0].delay_max * 1000,
                        postContent,
                        order
                    }

                }

                console.log('Sending farm data to socket', data)

                socket.emit('farming', data)

                await pool(`UPDATE facebook_account SET status =? WHERE id =?`, ['working', id])

                res.status(201).json({ message: 'Success' })

            } else {

                res.status(400).json({ message: 'Account not found.' })

            }

        }

    } catch (err) {

        console.log(err)

        res.status(400).json(err)

    }

}