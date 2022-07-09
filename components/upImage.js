import fetch from 'node-fetch'
import token from './tokenWordpress.js'
import fs from 'fs'
import Model from '../models/posterModel.js'
const URL = "https://radioondapopular.com/wp-json/wp/v2/media"
const upLoad = async (codigo) => {
    console.log(codigo)
    console.log(`attachment; filename="${codigo}.jpg"`)
    let dato = `attachment; filename="${codigo}.jpg"`
    try {
        const path = `screen/${codigo}.jpg`
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${await token()}`,
                'content-type': 'image/jpeg',
                'content-disposition':dato ,
            },
            body: fs.readFileSync(path, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data)
                }
            })
        })
       console.log(await response.json())
        const { id,source_url } = await response.json()
       const model = await  Model.findByIdAndUpdate(codigo,{$set:{source_url:source_url}})
       console.log(model)
        return id

    } catch (e) {
        console.log(e)
    }
}

export default upLoad