import fetch from 'node-fetch'
import { createWriteStream } from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import Model from '../models/posterModel.js'
async function download(URL,id) {
   try{
    console.log(URL)
    const streamPipeline = promisify(pipeline);    
    const response = await fetch(URL)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    await streamPipeline(response.body, createWriteStream(`images/${id}.jpg`))
    const reponse = await Model.findByIdAndUpdate(id,{$set:{estado_descarga_imagen:'true'}})  
   }catch(e) {console.log(e); console.log(`Hay un erro con la URL: ${URL}`)}  

}
export default download