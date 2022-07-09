import fetch from 'node-fetch'
import Model from '../models/posterModel.js'
async function publicar(id, imageUrl, time, title, content) {
    (await import('dotenv')).config({ path: ".env" })
    const codigo = id.toString()
    const nuevaHora = time.toISOString();
    const h = nuevaHora.substring(0, 19)  
    console.log(`${h}-05:00`)


    const url = `https://graph.facebook.com/104330924671939/feed?`;
    const image = imageUrl
    //const access_token = process.env.TOKEN_FACEBOOK;
    const scheduled_publish_time = `${h}-05:00`
    const published = false;
    const message = `${title} \n ${content}`;

    const response = await fetch(`${url}url=${image}&access_token=${process.env.TOKEN_FACEBOOK}&scheduled_publish_time=${scheduled_publish_time}&published=${published}&message=${message}`, {
        method: 'POST',
    })
    console.log(response.status)
    if (response.status === 200) {
        console.log("Se publicó en facebook")
        const re = await Model.findByIdAndUpdate(codigo, { $set: { estado_facebook: "true" } })

    }

}
export default publicar