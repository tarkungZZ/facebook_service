const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    // cors: {
    //     origin: "http://159.223.53.175:3001",
    //     methods: ["GET", "POST"],
    //     credentials: false
    // }

    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers)
        res.end()
    }

})

handlePreflightRequest: (req, res) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
        "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
}


const { SOCKET_PORT } = require('./helpers/config')
const updateStatus = require('./helpers/update_status')

io.on('connection', (socket) => {

    socket.emit('client-connection', 'Connected.')

    socket.on('farming', (data) => {
        console.log(`Sending data`, data)
        io.emit('launching', data)
    })

    socket.on('status', (data) => {
        console.log(`Update facebook working status.`)
        updateStatus(data)
        socket.emit('bot-status', { data })
    })

    socket.on('disconnect', () => {
        console.log('One client is disconnected.')
    })

})

http.listen(SOCKET_PORT, () => { console.log(`Socket server listening on port ${SOCKET_PORT}`) })

