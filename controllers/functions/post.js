const delay = require('../../helpers/delay')
const io = require('socket.io-client')
const { SERVER_SOCKET_IP, SERVER_SOCKET_PORT } = require('../../helpers/config')
const socket = io.connect(`http://${SERVER_SOCKET_IP}:${SERVER_SOCKET_PORT}`)

module.exports = async (page, randomDelay, post, timeout, pid, data) => {

    for (let i = 0; i < 6; i++) {

        try {

            await delay(3000)

            await page.waitForSelector(`[aria-label="สร้างโพสต์"]`, { timeout: 10000 })

            await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.buofh1pr.g5gj957u.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.pmt1y7k9.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div > div > div > div.j83agx80.btwxx1t3.taijpn5t > div > div:nth-child(3) > div > div > div > div.k4urcfbm.g5gj957u.buofh1pr.j83agx80.ll8tlv6m > div`)
            //await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.buofh1pr.g5gj957u.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.pmt1y7k9.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div > div > div > div.j83agx80.btwxx1t3.taijpn5t > div > div.sjgh65i0 > div > div > div > div.k4urcfbm.g5gj957u.buofh1pr.j83agx80.ll8tlv6m > div`)
            console.log(`click post.`)
            await delay(randomDelay)
            await page.type(`[aria-label="สร้างโพสต์"]`, post)
            console.log(`type post`)
            await delay(randomDelay)
            await page.click(`[aria-label="โพสต์"]`)

            console.log(`Post`, post, `successful.\n`)

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

            break

        } catch (err) {

            //console.log(err)

        }

    }

}