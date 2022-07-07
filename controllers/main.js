const clipboardy = require('node-clipboardy')
const fs = require('fs')
const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealth())

const config = require('../helpers/config')
const delay = require('../helpers/delay')
const getDay = require('../helpers/getDay')
const farmLike = require('./functions/like')
const farmPost = require('./functions/post')
const farmShare = require('./functions/share')
const farmStory = require('./functions/story')

module.exports = async (data) => {

    console.log(data)

    let count = 1
    let obj = {}

    const randomDelay = Math.floor(Math.random() * (data.delay_max - data.delay_min) + data.delay_min)

    if (data.id === null) {

        console.log(data.getData.length)

        for (let i = 0; i < data.getData.length; i++) {

            obj = {
                email: data.getData[i].email,
                fb_password: data.getData[i].fb_password,
                two_fa: data.getData[i].two_fa,
                execute_path: data.getData[i].execute_path
            }

            await delay(500)
            main(obj, data, config)

        }

    }

    if (data.id !== null) {

        obj = {
            email: data.email,
            fb_password: data.fb_password,
            two_fa: data.two_fa,
            execute_path: data.execute_path
        }

        await delay(500)
        main(obj, data, config)

    }

    async function main(obj, data, config) {

        try {

            const browser = await puppeteer.launch({
                headless: false,
                executablePath: obj.execute_path,
                slowMo: 10,
                args: [
                    //`--window-size=1024,768`,
                    '--no-sandbox',
                    "--disable-notifications",
                    '--disable-translate'
                ]
            })

            const pid = browser.process().pid
            //console.log(pid)
            const page = (await browser.pages())[0]
            // await page.setViewport({
            //     width: 1020,
            //     height: 764,
            //     deviceScaleFactor: 1
            // })

            const timeout = setTimeout(async () => { await page.close() }, 60000)

            let day = getDay()
            day = Number(day) - 1
            day += ''
            day = '0' + day

            if (fs.existsSync(`./cookies_${obj.email}_${day}.json`)) {

                await fs.readFile(`./cookies_${obj.email}_${day}.json`, async (err, data) => {

                    if (err) {
                        console.error(err)
                    }

                    console.log(`Reading yesterday cookies.`)

                    const cookies = JSON.parse(data)
                    await page.setCookie(...cookies)

                })

            }

            if (fs.existsSync(`./cookies_${obj.email}_${getDay()}.json`)) {

                await fs.readFile(`./cookies_${obj.email}_${getDay()}.json`, async (err, data) => {

                    if (err) {
                        console.error(err)
                    }

                    console.log(`Reading today cookies.`)

                    const cookies = JSON.parse(data)
                    await page.setCookie(...cookies)

                })

            }

            //await page.goto(config.mfb_url, { waitUntil: 'networkidle2' })
            await page.goto(config.fb_url, { waitUntil: 'networkidle2' })

            await page.waitForSelector('#email')
            await page.type('#email', obj.email)
            await delay(randomDelay)
            await page.type('#pass', obj.fb_password)

            const page2 = await browser.newPage()
            await page2.goto(config.two_fa_url)
            await page2.type('#listToken', obj.two_fa)
            await delay(randomDelay)
            await page2.click('#submit')
            await delay(randomDelay)
            await page2.click('#copy_btn', { clickCount: 2 })

            const clipboardtext = await clipboardy.readSync()
            const two_fa_code = clipboardtext.slice(-6)
            await page2.close()
            //console.log(two_fa_text)
            await delay(randomDelay)
            const loginButton = await page.waitForSelector('button[type="submit"][name="login"]')
            await loginButton.click()

            if (fs.existsSync(`./cookies_${obj.email}_${getDay()}.json`) || fs.existsSync(`./cookies_${obj.email}_${day}.json`)) {

                for (let i = 0; i < 5; i++) {

                    await delay(randomDelay)
                    await page.waitForSelector(`[aria-label="โหลดเพจอีกครั้ง"]`, { timeout: 3000 })
                    await page.click(`[aria-label="โหลดเพจอีกครั้ง"]`)

                    break

                }

            } else {

                await delay(8000)
                await page.type('#approvals_code', two_fa_code)

                for (let i = 0; i < 5; i++) {

                    try {

                        await delay(randomDelay)
                        await page.click('#checkpointSubmitButton')
                        await delay(randomDelay)
                        await page.click('#checkpointSubmitButton')
                        await delay(randomDelay)
                        await page.click('#checkpointSubmitButton')
                        await delay(randomDelay)
                        await page.click('#checkpointSubmitButton')
                        await delay(randomDelay)
                        await page.click('#checkpointSubmitButton')

                        break

                    } catch (err) {

                        if (err) { break }

                    }

                }

            }

            await delay(5000)

            for (let i = 0; i < 10; i++) {

                try {

                    await page.waitForSelector(`[aria-label="สร้างโพสต์"]`, { timeout: 3000 })
                    break

                } catch (err) {
                    if (err) {
                        console.log(`Not in the feed yet , wait for 15s.`)
                        await delay(15000)
                    }
                }

            }

            const saveCookies = await page.cookies()

            if (fs.existsSync(`./cookies_${obj.email}_${getDay()}.json`)) {

                console.log(`Today cookies already exist.`)

            } else {

                console.log(`Save today cookies.`)

                await fs.writeFile(`./cookies_${obj.email}_${getDay()}.json`, JSON.stringify(saveCookies, null, 2), 'utf8', function (err) {
                    if (err) return console.error(err)
                })

            }


            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



            if (data.type === 'like') {

                //console.log(`Start farming like for ${obj.email}.`)

                setInterval(() => {
                    count++
                    farmLike(page, randomDelay, count)
                }, 15000)

            }

            if (data.type === 'story') {

                //console.log(`Start farming story for ${obj.email}.`)

                farmStory(page, randomDelay, pid, timeout)

            }

            if (data.type === 'post') {

                //console.log(`Start farming post for ${obj.email}.`)

                farmPost(page, randomDelay, data.postContent, timeout, pid)

            }

            if (data.type === 'share') {

                //console.log(`Start farming share for ${obj.email}.`)

                farmShare(page, randomDelay, data.link, timeout, pid)

            }


        } catch (err) {

            console.log(err)

        }

    }

}