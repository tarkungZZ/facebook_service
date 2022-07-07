const io = require('socket.io-client')
const { SERVER_SOCKET_IP, SERVER_SOCKET_PORT } = require('./helpers/config')
const socket = io.connect(`http://${SERVER_SOCKET_IP}:${SERVER_SOCKET_PORT}`)
const main = require('./controllers/main')

socket.on('client-connection', (msg) => { console.log(msg) })

socket.on('launching', (data) => { main(data) })