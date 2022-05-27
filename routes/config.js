const app = require('express')()

app

    .get('/list', require('../controllers/config/list'))
    .post('/edit', require('../controllers/config/edit'))

module.exports = app