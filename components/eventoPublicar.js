
import Model from '../models/posterModel.js'
import publicarFacebook from './publicarFacebook.js'
import cron from 'node-cron'


async function evento(){
    try {
        const date = new Date();        
        const posts = await Model.find({estado_facebook:null});
        console.log("cantidad:"+posts.length)
        if (posts.length > 0) {
            Promise.all(
                posts.map(async (post) => {
                    const { fecha_publicacion, estado_facebook, _id } = post
                    const codigo = _id.toString()
                    console.log(codigo, fecha_publicacion)
                    if (estado_facebook === null && fecha_publicacion !==null) {
                        const month = fecha_publicacion.substring(5, 7)
                        const day = fecha_publicacion.substring(8, 10)
                        const hora = fecha_publicacion.substring(11, 13)
                        const min = fecha_publicacion.substring(14, 16)
                        //console.log(month, day, hora, min);
                        const fecha = `${date.getFullYear()}-${month}-${day}T${hora}:${min}:00-05:00`
                        const save = await Model.findByIdAndUpdate(codigo, { $set: { estado_facebook: "pendiente" } })
                        cron.schedule(`${min} ${hora} ${day} ${month} *`, async () => {
                            console.log(codigo)
                            const response = await publicarFacebook(codigo, post.title, post.content)
                            console.log("Se publicó el post " + response)
                        });
                    }

                }))
        }
        
    } catch (e) { console.log(e) }
}

export default evento