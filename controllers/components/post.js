const clipboardy = require('node-clipboardy')

module.exports = async (puppeteer, data, config) => {

    try {

        let post = data.post
        let pop = ''

        pop = post[Math.floor(Math.random() * post.length)]
        //console.log('this is 1st pop ', pop, '\n')
        post = post.filter(item => item !== pop)
        //console.log('this is 1st post', post, '\n')

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

        // //check verify birthdate selector

        // //#u_0_b_R6 > div._4-u2._5x_7._p0k._5x_9._a1-b._4-u8 > div._2ph_ > div > div > div:nth-child(1) > div > span
        // //#u_0_b_9y > div._4-u2._5x_7._p0k._5x_9._a1-b._4-u8 > div._2ph_ > div > div > div:nth-child(1) > div > span


        // //#u_c_1_st  //label input birthdate


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

        console.log('Start farm post\n')

        farmPost(page, pop)

        const startLoop = setInterval(async () => {

            pop = post[Math.floor(Math.random() * post.length)]
            console.log('pop', pop, '\n')
            post = post.filter(item => item !== pop)
            console.log('post', post, '\n')

            if (post.length === 0) {
                clearInterval(startLoop)
                await browser.close()
            }

            farmPost(page, pop)

        }, 3600000)

        async function farmPost(page, pop) {

            try {

                await page.waitForSelector(`[aria-label="สร้างโพสต์"]`, { timeout: 10000 })
                await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.buofh1pr.g5gj957u.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.pmt1y7k9.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div > div > div > div.j83agx80.btwxx1t3.taijpn5t > div > div.sjgh65i0 > div > div > div > div.k4urcfbm.g5gj957u.buofh1pr.j83agx80.ll8tlv6m > div`)
                await delay(randomDelay)
                await page.type(`[aria-label="สร้างโพสต์"]`, pop)
                await delay(randomDelay)
                await page.click(`[aria-label="โพสต์"]`)

                console.log(`Post`, pop, `successful.\n`)

            } catch (err) {

                console.log(err)

            }

        }

        function delay(time) {
            return new Promise((resolve) => {
                setTimeout(resolve, time)
            })
        }

    } catch (err) {

        console.log(err)

    }

}


