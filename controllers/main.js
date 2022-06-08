const clipboardy = require('node-clipboardy')
const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealth())
const config = require('../helpers/config')
const delay = require('../helpers/delay')
const farmLike = require('./functions/like')
const farmPost = require('./functions/post')
const farmShare = require('./functions/share')
const farmStory = require('./functions/story')
const farmRandom = require('./functions/random')

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
                    await delay(30000)
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

                //console.log(count)

                if (count >= 6) {
                    clearInterval(farm)
                    console.log(`Finish farm story loop.`)
                    await delay(randomDelay)
                    await browser.close()
                }

                farmStory(page, randomDelay, count)

                count++

            }, 15000)

        }

        if (data.type === 'post') {

            console.log(`Start farming post.`)

            farmPost(page, randomDelay, data.postContent)

        }

        if (data.type === 'share') {

            console.log(`Start farming share.`)

            farmShare(page, randomDelay, data.link)

        }

        if (data.type === 'random') {

            console.log(`Start random farm.`)

            let order = data.order

            for (let i = 0; i < 3; i++) {

                let pop = order[Math.floor(Math.random() * order.length)]

                order = order.filter(item => item !== pop)

                console.log(pop)
                console.log(order.length)

                if (pop === 1) {

                    console.log(`Start farming like.`)

                    const farm = await setInterval(async () => {

                        if (count >= 10) { clearInterval(farm) }

                        await farmLike(page, randomDelay, count)

                        count++

                    }, 5000)

                }

                if (pop === 2) {

                    count = 1

                    console.log(`Start farming story.`)

                    const farm = await setInterval(async () => {

                        //console.log(count)

                        if (count >= 6) { clearInterval(farm) }

                        await farmStory(page, randomDelay, count)

                        count++

                    }, 10000)

                }

                if (pop === 3) {

                    console.log(`Start farming post.`)

                    try {

                        await delay(3000)

                        await page.waitForSelector(`[aria-label="สร้างโพสต์"]`, { timeout: 10000 })
                        await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.buofh1pr.g5gj957u.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.pmt1y7k9.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div > div > div > div.j83agx80.btwxx1t3.taijpn5t > div > div.sjgh65i0 > div > div > div > div.k4urcfbm.g5gj957u.buofh1pr.j83agx80.ll8tlv6m > div`)
                        await delay(randomDelay)
                        await page.type(`[aria-label="สร้างโพสต์"]`, data.postContent)
                        await delay(randomDelay)
                        await page.click(`[aria-label="โพสต์"]`)

                        console.log(`Post`, data.postContent, `successful.\n`)

                    } catch (err) {

                        console.log(err)

                    }

                }

                if (order.length === 0) { await page.close() }

                await delay(120000)

            }

        }

    } catch (err) {

        console.log(err)

    }

}