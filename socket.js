const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
})

const { SOCKET_PORT } = require('./helpers/config')
const updateStatus = require('./helpers/update_status')

io.on('connection', (socket) => {

    socket.emit('client-connection', 'Connected.')

    socket.on('farming', (data) => {
        //console.log(`Sending data`, data)
        io.emit(`launching-${data.users_id}`, data)
    })

    socket.on('status', (data) => {
        console.log(data)
        io.emit('bot-status', data)
        updateStatus(data)
    })

    socket.on('disconnect', () => {
        console.log('One client is disconnected.')
    })

})

http.listen(SOCKET_PORT, () => { console.log(`Socket server listening on port ${SOCKET_PORT}`) })