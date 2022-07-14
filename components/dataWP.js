
import fetch from 'node-fetch';
import Model from '../models/posterModel.js'
import config from '../config.js'
async function dataWP() {
    const response = await fetch(`${config.getPosts}`)
    const json = await response.json();
    let objeto = []  

    for (let i = 0; i < json.length; i++) {        
        const { title, content, link, featured_media } = json[i]      
        const re = await fetch(`${config.dominio}/media/${featured_media}`)
        const json2 = await re.json();
        const { guid } = json2
        const img = json2.link     
     
        let data = {
            title: title.rendered,
            content: content.rendered,
            link: link,
            featured_media: featured_media,
            guid: img
        }  
        
        const info = await Model.findOne({ link: `${link}` })   
        if(info===null){
            objeto.push(data)
        } 
    }
   return objeto  
}

export default dataWP