const pool = require('./mysql')
const { SOCKET_IP, SOCKET_PORT } = require('./config')
const io = require('socket.io-client')
const socket = io.connect(`http://${SOCKET_IP}:${SOCKET_PORT}`)

module.exports = async () => {

    console.log(`Check queues.`)

    const checkQueues = await pool(`SELECT queues_id , type , id , email , fb_password , two_fa , execute_path , delay_min , delay_max FROM queues WHERE send =? ORDER BY created_at ASC LIMIT 1`, [0])

    if (checkQueues[0]) {

        //console.log(`Send data`, checkQueues[0])

        socket.emit(`farming`, checkQueues[0])

        await pool(`UPDATE queues SET send =? WHERE id =?`, [1, checkQueues[0].id])

    }

}