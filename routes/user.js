const app = require('express')()

app

    .post('/create', require('../controllers/create'))
    .post('/edit', require('../controllers/edit'))
    .post('/delete', require('../controllers/delete'))

module.exports = app