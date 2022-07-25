const pool = require('./mysql')
const { SOCKET_IP, SOCKET_PORT } = require('./config')
const io = require('socket.io-client')
const socket = io.connect(`http://${SOCKET_IP}:${SOCKET_PORT}`)
const moment = require('moment')

module.exports = async () => {

    console.log(`Check queues.`)

    const checkBots = await pool(`SELECT id , bot_name FROM bots WHERE work =? ORDER BY updated_at ASC LIMIT 1`, [0])

    if (checkBots[0]) {

        console.log(checkBots[0].bot_name)

        const checkQueues = await pool(`SELECT queues_id , type , id , email , fb_password , two_fa , execute_path , delay_min , delay_max FROM queues WHERE send =? ORDER BY created_at ASC LIMIT 1`, [0])

        if (checkQueues[0]) {

            let data = checkQueues[0]

            data.bot_id = checkBots[0].id
            data.bot_name = checkBots[0].bot_name

            console.log(`Send data`, data)

            const queues_data = { send: 1, work_by: checkBots[0].id }

            await pool(`UPDATE queues SET ? WHERE id =?`, [queues_data, checkQueues[0].id])

            const bot_data = { work: 1, work_with: checkQueues[0].queues_id, work_at: moment().format('YYYY/MM/DD HH:mm:ss') }

            await pool(`UPDATE bots SET ? WHERE id =?`, [bot_data, checkBots[0].id])

            socket.emit(`farming`, data)

        }

    }

}