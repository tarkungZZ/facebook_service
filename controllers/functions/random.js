const delay = require('../../helpers/delay')

module.exports = async (page, randomDelay, data) => {

    try {


        async function randomFarm(page) {

            for (let i = 0; i < 5; i++) {

                try {

                    if (i === 4) {

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

    } catch (err) {

        console.log(err)

    }

}