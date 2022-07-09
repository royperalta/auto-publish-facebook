import { chromium } from 'playwright'
let post = {}
const getPost = async (URL) => {
   try{
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage()
    try{
        await page.goto(URL)
    }catch(e){
        console.log(e)
        await page.close()
    }
    const title = await page.locator("h1").textContent()
    const imgUrl = await page.locator('.featured-image>img')
    const content = await page.locator('.entry-content').textContent()
    const featured_media = await imgUrl.getAttribute('src')

    post = {
        title: title,
        content: content,
        featured_media: featured_media,
        link:URL
    }
    await page.close()
    return post
   }catch(e){console.log(e)}
}

export default getPost