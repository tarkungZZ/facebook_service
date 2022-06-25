const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authorize = require('./middlewares/authorize')
const { PORT } = require('./helpers/config')

app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//no authorize
app.use('/login', require('./controllers/login'))

//authorize
app.use('/user', authorize, require('./routes/user'))

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })