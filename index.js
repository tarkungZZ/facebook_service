const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authorize = require('./middlewares/authorize')
const { MANAGER_PORT } = require('./helpers/config')

app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//no authorize
app.use('/login', require('./controllers/login'))
app.get('/user/list', require('./controllers/list'))

//authorize
app.use('/user', authorize, require('./routes/user'))

app.listen(MANAGER_PORT, () => { console.log(`Server listening on port ${MANAGER_PORT}`) })