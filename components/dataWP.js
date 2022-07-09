
import fetch from 'node-fetch';
import Model from '../models/posterModel.js'
async function dataWP() {
    const response = await fetch("https://radioondapopular.com/wp-json/wp/v2/posts?categories=38")
    const json = await response.json();
    let objeto = []    

    for (let i = 0; i < json.length; i++) {
        const { title, content, link, featured_media } = json[i]      
        const re = await fetch(`https://radioondapopular.com/wp-json/wp/v2/media/${featured_media}`)
        const json2 = await re.json();
        const { guid } = json2
        let data = {
            title: title.rendered,
            content: content.rendered,
            link: link,
            featured_media: featured_media,
            guid: guid.rendered
        }  
        const info = await Model.findOne({ link: `${link}` })   
        if(info===null){
            objeto.push(data)
        } 
    }
   return objeto  
}

export default dataWP