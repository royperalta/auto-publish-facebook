import { chromium } from 'playwright'
import Model from '../models/posterModel.js'
import upImage from './upImage.js'
const screen = async () => {
    try {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage()
        await page.goto("http://localhost:3000/", {})
        await page.waitForSelector('div[class="take"]')
        const imgSrc = page.locator('div[class="take"]')
        const id = page.locator('[class="id"]')
        const countImg = await imgSrc.count()


        for (let i = 0; i < countImg; i++) {
            console.log(i)
            let codigo = await id.nth(i).innerText()
            await imgSrc.nth(i).isVisible()
            await imgSrc.nth(i).screenshot({ path: `screen/${codigo}.jpg` })
            const data = await Model.findOne({ _id: codigo })
            const { estado_screen } = data
            if (estado_screen === null) {
                await Model.findByIdAndUpdate(codigo, { $set: { estado_screen: 'true' } })
            }
            //await upImage(codigo)
        }
        await browser.close()
    } catch (e) {
        console.log(e)
    }
}

export default screen