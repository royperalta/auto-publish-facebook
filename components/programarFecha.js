import FB from 'fb'
import fs from 'fs'
import getToken from './getToken.js'
import Model from '../models/posterModel.js'



async function programarFecha(id, hora) {
    try {
        console.log("Se publicara")
        const codigo = id.toString();
        console.log(codigo, hora)
        //  (await import('dotenv')).config({ path: ".env" })    
        // console.log(id.toString(),title,content,hora) 
        const nuevaHora = hora.toISOString();
        const h = nuevaHora.substring(0, 19)
        /*  console.log(h)
         console.log(`${h}-05:00`) */

        const response = await Model.findByIdAndUpdate(codigo, { $set: { fecha_publicacion: `${h}-05:00` } })
    } catch (e) { console.log(e) }

}
export default programarFecha