import { chromium } from 'playwright'
import post from './getDataPost.js'
import fetch from 'node-fetch'
import Model from '../models/posterModel.js'
const getData = async () => {
    try {
        const browser = await chromium.launch({ headless: false })
        const page = await browser.newPage({})
        try{
            await page.goto("https://radioondapopular.com/category/cajamarca")
        }catch(err){ 
            console.log("Page close")
            await browser.close()
        }
       
        const rowsLink = await page.locator('.entry-title>a')
        const count = await rowsLink.count()
        const links = []
        for (let i = 0; i < 3; i++) {
            const link = await rowsLink.nth(i).getAttribute('href')
            const response = await fetch(link, {
                method: 'GET',
            })

            console.log(response.status)
            if (response.status === 200) {
                const info = await Model.findOne({ link: `${link}` })
                if (info === null) {
                   try{
                    const data = await post(link)
                    links.push(data)
                   }catch(e) {console.log(e)} 
                   
                } else {
                    console.log("Ya está cargado")
                }
            }

        }
        await page.close()
        return links
    } catch (e) { console.log(e) }
}

export default getData