const delay = require('../../helpers/delay')
const io = require('socket.io-client')
const { SERVER_SOCKET_IP, SERVER_SOCKET_PORT } = require('../../helpers/config')
const socket = io.connect(`http://${SERVER_SOCKET_IP}:${SERVER_SOCKET_PORT}`)

module.exports = async (page, randomDelay, pid, timeout, data) => {

    for (let i = 0; i < 21; i++) {

        try {

            if (i === 20) {

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

            for (let v = 0; v < 22; v++) {
                await page.keyboard.press('ArrowDown', { delay: 50 })
            }

            //console.log(count)

            const likeButton = await page.waitForSelector(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.buofh1pr.g5gj957u.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.pmt1y7k9.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div > div > div > div.j83agx80.btwxx1t3.taijpn5t > div > div.pedkr2u6.tn0ko95a.pnx7fd3z > div > div:nth-child(${i + 1}) > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(4) > div > div > div:nth-child(1) > div > div.tvfksri0.ozuftl9m > div > div:nth-child(1)`, { visible: true, timeout: 3000 })
            //const likeButton = await page.waitForSelector(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.dp1hu0rb.p01isnhg > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.buofh1pr.g5gj957u.hpfvmrgz.taijpn5t.gs1a9yip.owycx6da.btwxx1t3.pmt1y7k9.f7vcsfb0.fjf4s8hc.b6rwyo50.oyrvap6t > div > div > div > div.j83agx80.btwxx1t3.taijpn5t > div > div.pedkr2u6.tn0ko95a.pnx7fd3z > div > div:nth-child(${count}) > div > div > div > div > div > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(4) > div > div > div > div > div.tvfksri0.ozuftl9m > div > div:nth-child(1) > div.oajrlxb2.gs1a9yip.g5ia77u1.mtkw9kbi.tlpljxtp.qensuy8j.ppp5ayq2.goun2846.ccm00jje.s44p3ltw.mk2mc5f4.rt8b4zig.n8ej3o3l.agehan2d.sk4xxmp2.rq0escxv.nhd2j8a9.mg4g778l.pfnyh3mw.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.tgvbjcpo.hpfvmrgz.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.l9j0dhe7.i1ao9s8h.esuyzwwr.du4w35lb.n00je7tq.arfg74bv.qs9ysxi8.k77z8yql.pq6dq46d.btwxx1t3.abiwlrkh.p8dawk7l.lzcic4wl.gokke00a`, { visible: true, timeout: 3000 })

            //console.log(`found like`)

            if ((Math.random() < 0.4) === true) {
                await delay(randomDelay)
                console.log(`Like.`)
                await likeButton.click()
            }

        } catch (err) {

            //console.log(err)

        }

        await delay(10000)

    }

}