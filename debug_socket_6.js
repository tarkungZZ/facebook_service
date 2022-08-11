const io = require('socket.io-client')
const socket = io.connect("http://159.223.53.175:5002")
const main = require('./controllers/main_debug')

socket.on('client-connection', (msg) => { console.log(msg) })

socket.on('launching-6', (data) => { main(data) })