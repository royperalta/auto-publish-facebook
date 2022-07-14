import express from 'express'
const router = express.Router()
import Model from '../models/posterModel.js'
//import data from './getAllData.js'
import data from './dataWP.js'
import download from './download.js'
import getScreenShot from './screenShot.js'
import fecha from './fecha.js'
import programarFecha from './programarFecha.js'
import publicarFacebook from './publicarFacebook.js'
import cron from 'node-cron'
import { convert } from 'html-to-text'
import publicar from './facebook.js'
import eventoPublicar from './eventoPublicar.js'
//import Model from '../models/posterModel.js'

router.get('/screen', async (req, res) => {
    await getScreenShot()
    res.status(200).json({ success: "correcto" })
})

router.get('/publicar', (req, res) => {
    const fecha = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    const hora = date.getHours() + ':' + date.getMinutes();

})
router.get('/programar', async (req, res) => {
    try {
        const date = new Date();
        const posts = await Model.find({ estado_facebook: null });
        console.log("cantidad:" + posts.length)
        if (posts.length > 0) {
            Promise.all(
                posts.map(async (post) => {
                    const { fecha_publicacion, estado_facebook, _id } = post
                    const codigo = _id.toString()
                    console.log(codigo, fecha_publicacion)
                    if (estado_facebook === null) {
                        const month = fecha_publicacion.substring(5, 7)
                        const day = fecha_publicacion.substring(8, 10)
                        const hora = fecha_publicacion.substring(11, 13)
                        const min = fecha_publicacion.substring(14, 16)
                        //console.log(month, day, hora, min);
                        const fecha = `${date.getFullYear()}-${month}-${day}T${hora}:${min}:00-05:00`
                        const save = await Model.findByIdAndUpdate(codigo, { $set: { estado_facebook: "pendiente" } })
                        cron.schedule(`${min} ${hora} ${day} ${month} *`, async () => {
                            console.log(codigo)
                            const response = await publicarFacebook(codigo, post.title, post.content, post.link)
                            console.log("Se publicó el post " + response)
                        });
                    }

                }))
        }
        res.send("Terminado")
    } catch (e) { console.log(e) }
})

router.get('/get', async (req, res) => {
    const exec = await Model.find({}).sort({ $natural: -1 }).limit(20)
    res.json(exec)
})
router.get('/save', async (req, res) => {
    try {
        const posts = await data()
        console.log(`Data = ${posts.length}`)
        if (posts) {
            if (posts.length > 0) {
                Promise.all(
                    posts.map(async (post) => {
                        //const reqTitulo = await Model.findOne({ title: post.title })
                        let decode = str => {
                            return str.replace(/&#(\d+);/g, function (match, dec) {
                                return String.fromCharCode(dec);
                            });
                        }
                        console.log(post.guid)
                        const con = decode(post.title)
                        const dat = convert(post.content, {
                            selectors: [{ selector: 'img', format: 'skip' }]
                        })
                        const datos = new Model({
                            title: con,
                            content: dat,
                            featured_media: post.guid,
                            register_date: new Date(),
                            fecha_publicacion: null,
                            estado_screen: null,
                            estado_descarga_imagen: null,
                            estado_facebook: null,
                            source_url: null,
                            link: post.link,
                        })
                        const response = await datos.save()
                                              
                        download(`${decode(post.guid)}`, response.id.toString())
                    }))
            }else{
                console.log("NO HAY DATA NUEVA")
            }

        } else {
           console.log("Hay un error en la data")
        }

        const array = await Model.find({ estado_facebook: null })
        console.log(`Cantidad facebook : ${array.length}`)
        if (array.length > 0) {
            const estadoScreen = await Model.find({ estado_screen: null })
            console.log(`Hay ${estadoScreen.length} para posters`)
            if(estadoScreen.length > 0){
                const estado = await getScreenShot()
                if (estado == 1) {
                    let cantidad = 3
                    for (let i = 0; i < array.length; i++) {
                        let hora = fecha(cantidad)
                        console.log(hora)
                        await programarFecha(array[i]._id, hora)
                        //publicar(data._id,data.source_url,hora,data.title,data.content)
                        cantidad = cantidad + 60;
                    }              
                }else if(estado == -1){
                    console.log("Error en el screenShot")
                }else if(estado == 0){
                    console.log("Error al cargar la pagina")
                }
            }else{
                console.log("No hay data para hacer screenShot")
            }
            
        }

        res.send("Se ha completado la programación en facebook")

        new Promise((resolve, reject) => {
            setTimeout(async () => {
                resolve(await eventoPublicar())
            }, 15000)
        })

    } catch (e) { console.log(e) }
})

export default router
