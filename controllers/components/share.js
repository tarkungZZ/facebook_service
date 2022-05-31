const clipboardy = require('node-clipboardy')

module.exports = async (puppeteer, data, config) => {

    try {

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

        console.log('Start farm share\n')

        farmShare(page, data.link)

        async function farmShare(page, link) {

            try {

                await page.goto(link)
                await page.waitForSelector(`[aria-label="ส่งลิงก์นี้ให้เพื่อนหรือโพสต์ลงในไทม์ไลน์ของคุณ"]`, { timeout: 10000 })
                await page.click(`[aria-label="ส่งลิงก์นี้ให้เพื่อนหรือโพสต์ลงในไทม์ไลน์ของคุณ"]`)
                await delay(randomDelay)
                await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div:nth-child(2) > div > div > div.j34wkznp.qp9yad78.pmk7jnqg.kr520xx4 > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div.rq0escxv.cwj9ozl2.nwpbqux9.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.ni8dbmo4.stjgntxs > div > div > div.rq0escxv.du4w35lb.ms05siws.pnx7fd3z.b7h9ocf4.pmk7jnqg.j9ispegn.kr520xx4.pedkr2u6.oqq733wu.k4urcfbm > div > div:nth-child(1) > div > div.ow4ym5g4.auili1gw.rq0escxv.j83agx80.buofh1pr.g5gj957u.i1fnvgqd.oygrvhab.cxmmr5t8.hcukyx3x.kvgmc6g5.tgvbjcpo.hpfvmrgz.qt6c0cv9.jb3vyjys.l9j0dhe7.du4w35lb.bp9cbjyn.btwxx1t3.dflh9lhu.scb9dxdr`)

                console.log(`Share`, link, `successful.\n`)
                await browser.close()

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


