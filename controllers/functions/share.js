const delay = require('../../helpers/delay')
const io = require('socket.io-client')
const { SERVER_SOCKET_IP, SERVER_SOCKET_PORT } = require('../../helpers/config')
const socket = io.connect(`http://${SERVER_SOCKET_IP}:${SERVER_SOCKET_PORT}`)

module.exports = async (page, randomDelay, link, post, timeout, pid, data) => {

    for (let i = 0; i < 6; i++) {

        try {

            await delay(3000)

            await page.goto(link)
            await page.waitForSelector(`[aria-label="ส่งลิงก์นี้ให้เพื่อนหรือโพสต์ลงในไทม์ไลน์ของคุณ"]`, { timeout: 10000 })
            await page.click(`[aria-label="ส่งลิงก์นี้ให้เพื่อนหรือโพสต์ลงในไทม์ไลน์ของคุณ"]`)
            await delay(randomDelay)

            if (i === 5) {

                //แชร์ทันที

                console.log(`Can't find share on feed , share without word instead.`)

                await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div > div:nth-child(2) > div > div > div.j34wkznp.qp9yad78.pmk7jnqg.kr520xx4 > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div.rq0escxv.cwj9ozl2.nwpbqux9.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.ni8dbmo4.stjgntxs > div > div > div.rq0escxv.du4w35lb.ms05siws.pnx7fd3z.b7h9ocf4.pmk7jnqg.j9ispegn.kr520xx4.pedkr2u6.oqq733wu.k4urcfbm > div > div:nth-child(1) > div > div.goun2846.mk2mc5f4.ccm00jje.s44p3ltw.rt8b4zig.sk4xxmp2.n8ej3o3l.agehan2d.rq0escxv.j83agx80.buofh1pr.g5gj957u.i1fnvgqd.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.tgvbjcpo.hpfvmrgz.jb3vyjys.qt6c0cv9.l9j0dhe7.du4w35lb.bp9cbjyn.btwxx1t3.dflh9lhu.scb9dxdr`)

                break

            }

            //แชร์ไปยังฟีด

            console.log(`click share on feeds`)

            await page.click(`div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div > div:nth-child(2) > div > div > div.j34wkznp.qp9yad78.pmk7jnqg.kr520xx4 > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div.rq0escxv.cwj9ozl2.nwpbqux9.io0zqebd.m5lcvass.fbipl8qg.nwvqtn77.ni8dbmo4.stjgntxs > div > div > div.rq0escxv.du4w35lb.ms05siws.pnx7fd3z.b7h9ocf4.pmk7jnqg.j9ispegn.kr520xx4.pedkr2u6.oqq733wu.k4urcfbm > div > div:nth-child(2) > div`)
            await delay(randomDelay)

            await page.waitForSelector(`div > div:nth-child(1) > div > div:nth-child(7) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div > form > div > div.rq0escxv.du4w35lb.ms05siws.pnx7fd3z.b7h9ocf4.pmk7jnqg.j9ispegn.kr520xx4.pedkr2u6.oqq733wu > div > div > div > div.rpm2j7zs.k7i0oixp.gvuykj2m.ni8dbmo4.du4w35lb.q5bimw55.ofs802cu.pohlnb88.dkue75c7.mb9wzai9.l56l04vs.r57mb794.l9j0dhe7.kh7kg01d.eg9m0zos.c3g1iek1.j83agx80.cbu4d94t.buofh1pr > div.j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 > div.o6r2urh6.buofh1pr.datstx6m.l9j0dhe7.k4urcfbm > div.rq0escxv.buofh1pr.df2bnetk.dati1w0a.l9j0dhe7.k4urcfbm.du4w35lb.ftjopcgk > div > div`, { timeout: 2000 })
            await page.type(`div > div:nth-child(1) > div > div:nth-child(7) > div > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div.iqfcb0g7.tojvnm2t.a6sixzi8.k5wvi7nf.q3lfd5jv.pk4s997a.bipmatt0.cebpdrjk.qowsmv63.owwhemhu.dp1hu0rb.dhp61c6y.l9j0dhe7.iyyx5f41.a8s20v7p > div > div > div > form > div > div.rq0escxv.du4w35lb.ms05siws.pnx7fd3z.b7h9ocf4.pmk7jnqg.j9ispegn.kr520xx4.pedkr2u6.oqq733wu > div > div > div > div.rpm2j7zs.k7i0oixp.gvuykj2m.ni8dbmo4.du4w35lb.q5bimw55.ofs802cu.pohlnb88.dkue75c7.mb9wzai9.l56l04vs.r57mb794.l9j0dhe7.kh7kg01d.eg9m0zos.c3g1iek1.j83agx80.cbu4d94t.buofh1pr > div.j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 > div.o6r2urh6.buofh1pr.datstx6m.l9j0dhe7.k4urcfbm > div.rq0escxv.buofh1pr.df2bnetk.dati1w0a.l9j0dhe7.k4urcfbm.du4w35lb.ftjopcgk > div > div`, post)
            console.log(`type word`)

            await delay(randomDelay)
            await page.click(`[aria-label="โพสต์"]`)

            break

        } catch (err) { continue }

    }

    console.log(`Share`, link, `successful.`)

    await delay(randomDelay)

    const obj = {
        id: data.id,
        email: data.email,
        status: 'finish',
        bot_id: data.bot_id,
        bot_name: data.bot_name
    }

    console.log(`work done sending socket.\n`)
    await socket.emit(`status`, obj)

    await process.kill(pid)

    await clearTimeout(timeout)


}