module.exports = async (puppeteer, data, config) => {

    try {

        const browser = await puppeteer.launch({
            headless: false,
            executablePath: data.execute_path,
            slowMo: 10,
            args: [`--window-size=1024,768`, '--no-sandbox']
        })

        const page = (await browser.pages())[0]
        await page.setViewport({
            width: 1020,
            height: 764,
            deviceScaleFactor: 1
        })

        await page.goto(config.mfb_url, { waitUntil: 'networkidle2' })
        await page.goto(config.fb_url, { waitUntil: 'networkidle2' })

        await browser.close()

    } catch (err) {

        console.log(err)

    }

}


