const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authorize = require('./middlewares/authorize')
const { PORT } = require('./helpers/config')

app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//no authorize
// app.use('/login', require('./routes/user'))

//authorize
app.use('/facebook', require('./routes/facebook'))
app.use('/config', require('./routes/config'))

app.post('/launch', require('./controllers/launch_button'))

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })