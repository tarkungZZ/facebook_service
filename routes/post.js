const app = require('express')()

app

    .get('/list', require('../controllers/posts/list_post'))

    .post('/add', require('../controllers/posts/create_post'))
    .post('/delete', require('../controllers/posts/delete_post'))

module.exports = app