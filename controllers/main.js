const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealth())
const farmLike = require('./components/like')
const farmPost = require('./components/post')
const farmShare = require('./components/share')
const config = require('../helpers/config')

module.exports = async (data) => {

    //console.log(data)

    if (data.type === 'like') { farmLike(puppeteer, data, config) }

    if (data.type === 'post') { farmPost(puppeteer, data, config) }

    if (data.type === 'share') { farmShare(puppeteer, data, config) }

}