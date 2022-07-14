import { chromium } from 'playwright'
import Model from '../models/posterModel.js'
import upImage from './upImage.js'
const screen = async () => {
    let valor = 0;
    try {

        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage()
        try {
            await page.goto("http://localhost:3000/", {})
            valor = 1
        } catch (e) {
            valor = -1
            await browser.close()
        }

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
        }
        await browser.close()
        return valor;
    } catch (e) {
        valor = -1
        console.log(e)
        await browser.close()
    }
    await browser.close()
    return valor
}

export default screen