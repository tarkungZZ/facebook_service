const clipboardy = require('node-clipboardy')
const fs = require('fs')
const puppeteer = require('puppeteer')
// const stealth = require('puppeteer-extra-plugin-stealth')
// puppeteer.use(stealth())
const io = require('socket.io-client')
const { SERVER_SOCKET_IP, SERVER_SOCKET_PORT } = require('../helpers/config')
const socket = io.connect(`http://${SERVER_SOCKET_IP}: ${SERVER_SOCKET_PORT}`)

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
                defaultViewport: null,
                //executablePath: obj.execute_path,
                slowMo: 10,
                args: [
                    //`--window-size=1024,768`,
                    "--disable-notifications",
                    '--disable-translate',
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--disable-setuid-sandbox',
                    '--no-first-run',
                    '--no-sandbox',
                    '--no-zygote',
                    '--deterministic-fetch',
                    '--disable-features=IsolateOrigins',
                    '--disable-site-isolation-trials',
                    '--disable-crash-reporter'
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

            const timeout = setTimeout(async () => {

                try {

                    //console.log(`kill?`)
                    //console.log(pid)

                    const obj = {
                        id: data.id,
                        email: data.email,
                        status: 'finish'
                    }

                    await socket.emit(`status`, obj)
                    await browser.close()


                } catch (err) { console.log(err) }

            }, 300000)

            let day = getDay()
            day = Number(day) - 1
            if (day < 10) {
                day += ''
                day = '0' + day
            } else { day += '' }

            if (fs.existsSync(`./cookies_${obj.email}_${getDay()}.json`)) {

                await fs.readFile(`./cookies_${obj.email}_${getDay()}.json`, async (err, data) => {

                    if (err) {
                        console.error(err)
                    }

                    console.log(`Reading today cookies.`)

                    const cookies = JSON.parse(data)
                    await page.setCookie(...cookies)

                })

            } else if (fs.existsSync(`./cookies_${obj.email}_${day}.json`)) {

                await fs.readFile(`./cookies_${obj.email}_${day}.json`, async (err, data) => {

                    if (err) {
                        console.error(err)
                    }

                    console.log(`Reading yesterday cookies.`)

                    const cookies = JSON.parse(data)
                    await page.setCookie(...cookies)

                })

            }

            //await page.goto(config.mfb_url, { waitUntil: 'networkidle2' })
            await page.goto(config.fb_url, { waitUntil: 'networkidle2' })

            await page.waitForSelector('#email')
            await page.type('#email', obj.email)
            console.log(`type email`)
            await delay(randomDelay)
            await page.type('#pass', obj.fb_password)
            console.log(`type pass`)
            const page2 = await browser.newPage()
            await page2.goto(config.two_fa_url)
            await page2.type('#listToken', obj.two_fa)
            console.log(`listToken`)
            await delay(randomDelay)
            await page2.click('#submit')
            console.log(`submit`)
            await delay(randomDelay)
            await page2.click('#copy_btn', { clickCount: 2 })
            console.log(`copy_btn`)
            const clipboardtext = await clipboardy.readSync()
            const two_fa_code = clipboardtext.slice(-6)
            await page2.close()
            //console.log(two_fa_text)
            await delay(randomDelay)
            const loginButton = await page.waitForSelector('button[type="submit"][name="login"]')
            await loginButton.click()
            console.log(`login`)

            if (fs.existsSync(`./cookies_${obj.email}_${getDay()}.json`)) {

                for (let i = 0; i < 5; i++) {

                    try {

                        await page.waitForSelector(`[aria-label="โหลดเพจอีกครั้ง"]`, { timeout: 3000 })
                        await page.click(`[aria-label="โหลดเพจอีกครั้ง"]`)

                        break

                    } catch (err) {

                        console.log(err)
                        await delay(3000)

                    }

                }

            } else if (fs.existsSync(`./cookies_${obj.email}_${day}.json`)) {

                for (let i = 0; i < 5; i++) {

                    try {

                        await page.waitForSelector(`[aria-label="โหลดเพจอีกครั้ง"]`, { timeout: 3000 })
                        await page.click(`[aria-label="โหลดเพจอีกครั้ง"]`)

                        break

                    } catch (err) {

                        console.log(err)
                        await delay(3000)

                    }

                }

            } else {

                await delay(5000)
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

                        console.log(err)

                        if (err) { break }

                    }

                }

            }

            await delay(2000)

            for (let i = 0; i < 10; i++) {

                try {

                    await page.waitForSelector(`[aria-label="สร้างโพสต์"]`, { timeout: 3000 })
                    break

                } catch (err) {
                    if (err) {
                        console.log(err)
                        console.log(`Not in the feed yet , wait for 15s.`)
                        await delay(5000)
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

                console.log(`Start farming like for ${obj.email}.`)

                setInterval(() => {
                    count++
                    farmLike(page, randomDelay, count)
                }, 10000)

            }

            if (data.type === 'story') {

                console.log(`Start farming story for ${obj.email}.`)

                farmStory(page, randomDelay, pid, timeout, data)

            }

            if (data.type === 'post') {

                console.log(`Start farming post for ${obj.email}.`)

                farmPost(page, randomDelay, data.postContent, timeout, pid, data)

            }

            if (data.type === 'share') {

                console.log(`Start farming share for ${obj.email}.`)

                farmShare(page, randomDelay, data.link, timeout, pid, data)

            }


        } catch (err) {

            console.log(err)

        }

    }

}