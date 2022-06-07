const pool = require('../helpers/mysql')
const { SOCKET_IP, SOCKET_PORT } = require('../helpers/config')
const io = require('socket.io-client')
const socket = io.connect(`http://${SOCKET_IP}:${SOCKET_PORT}`)

module.exports = async (req, res) => {

    const { id, type, link } = req.body

    const getData = await pool(`SELECT id , email, fb_password, two_fa , execute_path FROM facebook_account WHERE id =? `, [id])
    const getConfig = await pool(`SELECT delay , delay_end FROM config WHERE id =?`, [1])

    let data = {}
    let post = []

    if (getData[0]) {

        if (type === 'like' || type === 'story') {

            data = {
                type,
                id: getData[0].id,
                email: getData[0].email,
                fb_password: getData[0].fb_password,
                two_fa: getData[0].two_fa,
                execute_path: getData[0].execute_path,
                delay: getConfig[0].delay * 1000,
                delay_end: getConfig[0].delay_end * 1000,
            }

        }

        if (type === 'post') {

            const getPost = await pool(`SELECT post FROM facebook_post ORDER BY created_at DESC LIMIT 10`)

            for (let i = 0; i < getPost.length; i++) {
                post.push(Object.values(getPost[i]))
            }

            data = {
                type,
                id: getData[0].id,
                email: getData[0].email,
                fb_password: getData[0].fb_password,
                two_fa: getData[0].two_fa,
                execute_path: getData[0].execute_path,
                delay: getConfig[0].delay * 1000,
                delay_end: getConfig[0].delay_end * 1000,
                post
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
                delay: getConfig[0].delay * 1000,
                delay_end: getConfig[0].delay_end * 1000,
                link
            }

        }

        if (type === 'random') {

            const getPost = await pool(`SELECT post FROM facebook_post ORDER BY RAND() LIMIT 1`)

            post.push(Object.values(getPost[0]))

            data = {
                type,
                id: getData[0].id,
                email: getData[0].email,
                fb_password: getData[0].fb_password,
                two_fa: getData[0].two_fa,
                execute_path: getData[0].execute_path,
                delay: getConfig[0].delay * 1000,
                delay_end: getConfig[0].delay_end * 1000,
                post
            }

        }

        console.log('Sending farm data to socket', data)

        socket.emit('farming', data)

        res.status(200).json({ message: 'Success' })

    } else {

        res.status(404).json({ message: 'Account not found.' })

    }


}