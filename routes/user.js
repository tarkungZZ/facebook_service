const app = require('express')()

app

    .get('/list', require('../controllers/list'))

    .post('/create', require('../controllers/create'))
    .post('/edit', require('../controllers/edit'))
    .post('/delete', require('../controllers/delete'))

module.exports = app