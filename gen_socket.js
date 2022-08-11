const request = require('request-promise')
const fs = require('fs')

getUsers()

async function getUsers() {

    try {

        let data = await request.get(`http://159.223.53.175:5000/user/list?limit=100&page=0`)
        data = JSON.parse(data)
        console.log(data)

        for (let i = 0; i < data.total; i++) {

            if (fs.existsSync(`socket_${data.result[i].id}.js`)) {

                console.log(`socket_${data.result[i].id}.js already created.`)

            } else {

                await fs.writeFile(`socket_${data.result[i].id}.js`, `const io = require('socket.io-client')\nconst socket = io.connect("http://159.223.53.175:5002")\nconst main = require('./controllers/main')\n\nsocket.on('client-connection', (msg) => { console.log(msg) })\n\nsocket.on('launching-${data.result[i].id}', (data) => { main(data) })`, (err) => {
                    if (err) { console.log(err) }
                })

                await fs.writeFile(`debug_socket_${data.result[i].id}.js`, `const io = require('socket.io-client')\nconst socket = io.connect("http://159.223.53.175:5002")\nconst main = require('./controllers/main_debug')\n\nsocket.on('client-connection', (msg) => { console.log(msg) })\n\nsocket.on('launching-${data.result[i].id}', (data) => { main(data) })`, (err) => {
                    if (err) { console.log(err) }
                })

                await fs.writeFile(`start_bot_${data.result[i].username}.bat`, `@echo off\nstart node socket_${data.result[i].id}.js`, (err) => {
                    if (err) { console.log(err) }
                })

                await fs.writeFile(`start_debug_bot_${data.result[i].username}.bat`, `@echo off\nstart node debug_socket_${data.result[i].id}.js`, (err) => {
                    if (err) { console.log(err) }
                })

            }

        }

    } catch (err) { console.log(err) }

}