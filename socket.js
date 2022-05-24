const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { SOCKET_PORT } = require('./helpers/config')


io.on('connection', (socket) => {

    socket.emit('connect', 'connected.')


    socket.on('disconnected', () => {
        console.log('Disconnected')
    })

})


http.listen(SOCKET_PORT, () => { console.log(`Socket server listening on port ${SOCKET_PORT}`) })

