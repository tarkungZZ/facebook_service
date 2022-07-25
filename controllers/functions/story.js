const delay = require('../../helpers/delay')
const io = require('socket.io-client')
const { SERVER_SOCKET_IP, SERVER_SOCKET_PORT } = require('../../helpers/config')
const socket = io.connect(`http://${SERVER_SOCKET_IP}:${SERVER_SOCKET_PORT}`)

module.exports = async (page, randomDelay, pid, timeout, data) => {

    try {

        for (let i = 0; i < 10; i++) {

            //console.log(`check work`)

            //await delay(Math.floor(Math.random() * (10000 - 5000) + 5000))

            const emote = ['ถูกใจ', 'รักเลย', 'ห่วงใย', 'ว้าว']

            const random = Math.floor(Math.random() * emote.length)

            const randomEmote = `[aria-label="${emote[random]}"]`

            //console.log(`click story number ${i + 1}`)

            if (i === 5) {

                await delay(randomDelay)

                const obj = {
                    id: data.id,
                    email: data.email,
                    status: 'finish',
                    bot_id: data.bot_id,
                    bot_name: data.bot_name
                }

                console.log(`work done sending socket.`)
                await socket.emit(`status`, obj)

                await process.kill(pid)
                await clearTimeout(timeout)

            }

            if (i === 0) {

                await page.evaluate(() => { window.scroll(0, 0) })
                await delay(randomDelay)

                try {

                    await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.buofh1pr.g5gj957u.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.pmt1y7k9.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div > div > div > div.d2edcug0.e3xpq0al.ejjq64ki > div > div.d2edcug0.rq0escxv > div > div:nth-child(2)`)

                } catch (err) {

                    if (err) { await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.buofh1pr.g5gj957u.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.pmt1y7k9.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div > div > div > div:nth-child(3) > div > div > div > div.oh7imozk.abvwweq7.ejjq64ki.d2edcug0 > div > div > div > div.rq0escxv.l9j0dhe7.du4w35lb.obtkqiv7.sv5sfqaa.sj5x9vvc.cxgpxx05 > div > div > div:nth-child(3)`) }

                }

                await delay(Math.floor(Math.random() * (5000 - 2000) + 1000))

                try {

                    //console.log(`check if element appear`)

                    await page.waitForSelector(randomEmote, { timeout: 3000 })
                    //console.log(`found emote`)
                    await page.click(randomEmote)
                    const logEmote = randomEmote.match(/([ก-ฮ]).*/g)
                    console.log(`sent emote`, logEmote[0].slice(0, -2))

                } catch (err) {

                    if (err) {

                        page.keyboard.press(`F5`)

                        console.log('err in', err)

                        await delay(5000)

                    }

                }

            }

            if (i === 1) {

                for (let i = 0; i < 5; i++) {

                    await page.keyboard.press(`Tab`)

                }

                await page.keyboard.press(`Enter`)

                await delay(Math.floor(Math.random() * (5000 - 2000) + 1000))

                try {

                    //console.log(`check if element appear`)

                    await page.waitForSelector(randomEmote, { timeout: 3000 })
                    //console.log(`found emote`)
                    await page.click(randomEmote)
                    const logEmote = randomEmote.match(/([ก-ฮ]).*/g)
                    console.log(`sent emote`, logEmote[0].slice(0, -2))

                } catch (err) {

                    page.keyboard.press(`F5`)

                    //console.log('err in', err)

                    await delay(5000)

                }

            } else {

                //await page.click(`#viewer_dialog > div > div > div > div.o36gj0jk.datstx6m.hybvsw6c > div > div > div > div > div > div.sxpk6l6v > div > div > div:nth-child(2) > div:nth-child(${i + 1}) > div > div > div`)
                await page.keyboard.press(`Tab`)
                await delay(randomDelay)
                await page.keyboard.press(`Enter`)
                await delay(Math.floor(Math.random() * (5000 - 2000) + 1000))

                try {

                    //console.log(`check if element appear`)

                    await page.waitForSelector(randomEmote, { timeout: 3000 })
                    //console.log(`found emote`)
                    await page.click(randomEmote)
                    const logEmote = randomEmote.match(/([ก-ฮ]).*/g)
                    console.log(`sent emote`, logEmote[0].slice(0, -2))

                } catch (err) {

                    page.keyboard.press(`F5`)

                    //console.log('err in', err)

                    await delay(5000)

                }

            }

        }

    } catch (err) {

        //console.log(`err out`, err)

    }

}


