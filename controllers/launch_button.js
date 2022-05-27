const pool = require('../helpers/mysql')
const { SOCKET_IP, SOCKET_PORT } = require('../helpers/config')
const io = require('socket.io-client')
const socket = io.connect(`http://${SOCKET_IP}:${SOCKET_PORT}`)

module.exports = async (req, res) => {

    const { id, type } = req.body

    const getData = await pool(`SELECT id , email, fb_password, two_fa , execute_path FROM facebook_account WHERE id =? `, [id])

    if (getData[0]) {

        const data = {
            type,
            id: getData[0].id,
            email: getData[0].email,
            fb_password: getData[0].fb_password,
            two_fa: getData[0].two_fa,
            execute_path: getData[0].execute_path
        }

        console.log('Sending farm data to socket', data)

        socket.emit('farming', data)

        res.status(200).json({ message: 'Success' })

    } else {

        res.status(404).json({ message: 'Account not found.' })

    }


}