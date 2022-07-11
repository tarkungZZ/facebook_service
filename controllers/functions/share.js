const delay = require('../../helpers/delay')
const io = require('socket.io-client')
const { SERVER_SOCKET_IP, SERVER_SOCKET_PORT } = require('../../helpers/config')
const socket = io.connect(`http://${SERVER_SOCKET_IP}:${SERVER_SOCKET_PORT}`)

module.exports = async (page, randomDelay, link, timeout, pid, data) => {

    for (let i = 0; i < 6; i++) {

        try {

            await delay(3000)

            await page.goto(link)
            await page.waitForSelector(`[aria-label="ส่งลิงก์นี้ให้เพื่อนหรือโพสต์ลงในไทม์ไลน์ของคุณ"]`, { timeout: 10000 })
            await page.click(`[aria-label="ส่งลิงก์นี้ให้เพื่อนหรือโพสต์ลงในไทม์ไลน์ของคุณ"]`)
            console.log(`click share`)
            await delay(randomDelay)
            await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div > div:nth-child(2) > div > div > div.j34wkznp.qp9yad78.pmk7jnqg.kr520xx4 > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div.rq0escxv.cwj9ozl2.nwpbqux9.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.ni8dbmo4.stjgntxs > div > div > div.rq0escxv.du4w35lb.ms05siws.pnx7fd3z.b7h9ocf4.pmk7jnqg.j9ispegn.kr520xx4.pedkr2u6.oqq733wu.k4urcfbm > div > div:nth-child(1) > div > div.ow4ym5g4.auili1gw.rq0escxv.j83agx80.buofh1pr.g5gj957u.i1fnvgqd.oygrvhab.cxmmr5t8.hcukyx3x.kvgmc6g5.tgvbjcpo.hpfvmrgz.qt6c0cv9.jb3vyjys.l9j0dhe7.du4w35lb.bp9cbjyn.btwxx1t3.dflh9lhu.scb9dxdr`)

            console.log(`Share`, link, `successful.\n`)

            await delay(randomDelay)

            const obj = {
                id: data.id,
                email: data.email,
                status: 'finish'
            }

            console.log(`work done sending socket.`)
            await socket.emit(`status`, obj)

            await process.kill(pid)

            await clearTimeout(timeout)

            break

        } catch (err) {

            console.log(err)

        }

    }

}