const app = require('express')()

app

    .get('/list', require('../controllers/list'))

    .post('/register', require('../controllers/register'))
    .post('/edit', require('../controllers/edit'))
    .post('/delete', require('../controllers/delete'))

module.exports = app