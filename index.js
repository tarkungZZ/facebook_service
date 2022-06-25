const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authorize = require('./middlewares/authorize')
const { PORT } = require('./helpers/config')

app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//no authorize
app.post('/login', require('./controllers/login'))

//authorize
app.use('/facebook', authorize, require('./routes/facebook'))
app.use('/config', authorize, require('./routes/config'))
app.use('/post', authorize, require('./routes/post'))

app.post('/launch', authorize, require('./controllers/launch_button'))

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })