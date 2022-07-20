const app = require('express')()

app

    .get('/list', require('../controllers/fb_accounts/account_list'))

    .post('/add', require('../controllers/fb_accounts/account_add'))
    .post('/edit', require('../controllers/fb_accounts/account_edit'))
    .post('/delete', require('../controllers/fb_accounts/account_delete'))
    .post('/status', require('../controllers/fb_accounts/account_status'))
    .post('/reset', require('../controllers/fb_accounts/reset_button'))

module.exports = app