const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const authorize = require('./middlewares/authorize')
const { PORT } = require('./helpers/config')
const auto_reset_status = require('./helpers/auto_reset_status')
const auto_reset_bots = require('./helpers/auto_reset_bots')
const queues = require('./helpers/queues')

setInterval(auto_reset_status, 3000)
setInterval(auto_reset_bots, 3000)
setInterval(queues, 3000)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//no authorize
app.get('/status', require('./controllers/get_status'))

app.post('/login', require('./controllers/login'))

//authorize
app.use('/facebook', authorize, require('./routes/facebook'))
app.use('/config', authorize, require('./routes/config'))
app.use('/post', authorize, require('./routes/post'))

app.post('/launch', authorize, require('./controllers/launch_button'))
app.post('/multi-launch', authorize, require('./controllers/launch_multi_button'))

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })