const clipboardy = require('node-clipboardy')

module.exports = async (puppeteer, data, config) => {

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

                await page.waitForSelector(`[aria-label="สตอรี่"]`, { timeout: 3000 })
                break

            } catch (err) {
                if (err) {
                    console.log(`Not in the feed yet , wait for 30s`)
                    await delay(60000)
                }
            }

        }

        console.log('Start farm story')

        farmStory(page)

        async function farmStory(page) {

            for (let i = 0; i < 5; i++) {

                try {

                    if (i === 5) {

                        await browser.close()

                        break

                    }

                    await delay(Math.floor(Math.random() * (15000 - 5000) + 5000))

                    const emote = ['ถูกใจ', 'รักเลย', 'ห่วงใย', 'ว้าว']

                    const random = Math.floor(Math.random() * emote.length)

                    const randomEmote = `[aria-label="${emote[random]}"]`

                    //console.log(`click story number ${i + 1}`)

                    await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.buofh1pr.g5gj957u.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.pmt1y7k9.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div > div > div > div:nth-child(3) > div > div > div > div.oh7imozk.abvwweq7.ejjq64ki.d2edcug0 > div > div > div > div.rq0escxv.l9j0dhe7.du4w35lb.obtkqiv7.sv5sfqaa.sj5x9vvc.cxgpxx05 > div > div > div:nth-child(${i + 3})`)
                    await delay(Math.floor(Math.random() * (8000 - 1000) + 3000))

                    try {

                        //console.log(`check if element appear`)

                        await page.waitForSelector(`[aria-label="ถูกใจ"]`, { timeout: 3000 })
                        //console.log(`found emote`)
                        await page.click(randomEmote)
                        //console.log(`sent emote`)
                        await delay(randomDelay)
                        await page.keyboard.press('Escape')

                    } catch (err) {

                        if (err) {
                            //console.log('err in', err)
                            await page.keyboard.press('Escape')
                            continue
                        }

                    }

                } catch (err) {

                    if (err) {
                        //console.log('err out', err)
                        break
                    }

                }

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


