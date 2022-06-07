const clipboardy = require('node-clipboardy')
const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealth())
const config = require('../helpers/config')
const delay = require('../helpers/delay')
const farmLike = require('./components/like')
const farmPost = require('./components/post')
const farmShare = require('./components/share')
const farmStory = require('./components/story')
const farmRandom = require('./components/random')

module.exports = async (data) => {

    //console.log(data)

    try {

        let count = 1

        const randomDelay = Math.floor(Math.random() * (data.delay_end - data.delay) + data.delay)

        const browser = await puppeteer.launch({
            headless: false,
            executablePath: data.execute_path,
            slowMo: 10,
            args: [
                //`--window-size=1024,768`,
                '--no-sandbox',
                "--disable-notifications",
                '--disable-translate'
            ]
        })

        const page = (await browser.pages())[0]
        // await page.setViewport({
        //     width: 1020,
        //     height: 764,
        //     deviceScaleFactor: 1
        // })

        await page.goto(config.mfb_url, { waitUntil: 'networkidle2' })
        await page.goto(config.fb_url, { waitUntil: 'networkidle2' })

        await page.waitForSelector('#email')
        await page.type('#email', data.email)
        await delay(randomDelay)
        await page.type('#pass', data.fb_password)
        await delay(randomDelay)
        const loginButton = await page.waitForSelector('button[type="submit"][name="login"]')
        await loginButton.click()

        const page2 = await browser.newPage()
        await page2.goto(config.two_fa_url)
        await page2.type('#listToken', data.two_fa)
        await delay(randomDelay)
        await page2.click('#submit')
        await delay(randomDelay)
        await page2.click('#copy_btn', { clickCount: 2 })

        const clipboardtext = await clipboardy.readSync()
        const two_fa_code = clipboardtext.slice(-6)
        await page2.close()
        //console.log(two_fa_text)
        await delay(randomDelay)
        await page.type('#approvals_code', two_fa_code)

        for (let i = 0; i < 5; i++) {

            try {

                await delay(randomDelay)
                await page.click('#checkpointSubmitButton')
                await delay(randomDelay)
                await page.click('#checkpointSubmitButton')
                break

            } catch (err) {

                if (err) { break }

            }

        }

        await delay(5000)

        for (let i = 0; i < 10; i++) {

            try {

                await page.waitForSelector(`[aria-label="สร้างโพสต์"]`, { timeout: 3000 })
                break

            } catch (err) {
                if (err) {
                    console.log(`Not in the feed yet , wait for 30s`)
                    await delay(60000)
                }
            }

        }

        if (data.type === 'like') {
            console.log(`Start farming like.`)
            setInterval(() => {
                count++
                farmLike(page, randomDelay, count)
            }, 30000)
        }

        if (data.type === 'story') {
            console.log(`Start farming story.`)
            const farm = setInterval(async () => {
                console.log(count)
                if (count >= 6) {
                    clearInterval(farm)
                    console.log(`Finish farm story loop.`)
                    await delay(randomDelay)
                    await browser.close()
                }
                farmStory(page, randomDelay, count)
                count++
            }, 30000)
        }

        if (data.type === 'post') { farmPost(puppeteer, data, config) }

        if (data.type === 'share') { farmShare(puppeteer, data, config) }

        if (data.type === 'all') { farmRandom(puppeteer, data, config) }

    } catch (err) {

        console.log(err)

    }

}