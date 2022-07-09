/* import mongoose from 'mongoose'

async function main() {
    await mongoose.connect(`mongodb://localhost:27017/base`)
}
main().catch(err => console.log(err))

const kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function speak() {
    const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
};

const Kitten = mongoose.model('Kitten', kittySchema);

const fluffy = new Kitten({ name: 'Alicia' })

await fluffy.save()
fluffy.speak() */

/* const fecha =new Date()
console.log(fecha)
console.log(fecha.getFullYear())
console.log(fecha.getDate())
 */


/* const date = new Date()
const newFecha = date.setDate(date.getDate()-4)
console.log(new Date(newFecha)) */

/* const date =new Date()
var timestamp = new Date().getTime();
const hora = timestamp.toLocaleString()
console.log(new Date(timestamp+15))
console.log(hora) */




/* var today= new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });
console.log(today); 
console.log(new Date(today)) */

/* function contador() {
    var fecha = new Date();
    var sumarsesion = 5;
    return fecha.getMinutes() + ":" + (fecha.setMinutes(fecha.getMinutes() + sumarsesion) && fecha.getMinutes());
}
console.log(contador()) */




/* let nuevo = new Date(fecha)
let minute = nuevo.getMinutes()
let nuevoMinuto = nuevo.setMinutes(minute+20)
console.log(nuevoMinuto)
console.log(nuevo)
let datos = nuevo.setMinutes(nuevo.getMinutes+15)

let nuevoDato = new Date('2022-06-28T08:00:00.000Z')
console.log(nuevoDato.toJSON()) */
/* 
import moment from 'moment'
let fecha = moment().format()
let nuevaFecha = new Date(fecha);
let horaP = nuevaFecha.setHours(nuevaFecha.getHours() - 5)
let h = new Date(horaP)   
let horaPeruSecond = h.setMinutes(h.getMinutes() + 30);
//console.log(horaPeruSecond)
let horaPeru = new Date(horaPeruSecond)
let data = horaPeru.toISOString()
let or = data.substring(0,19)
console.log(typeof or)

 */
/* const date = new Date();
const hoy = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
const minutos = parseInt(`${date.getMinutes()}`)
const horaNow = parseInt(`${date.getHours()}`)
const horaInicial = horaNow
const horaPublicacion = `${(horaInicial + 1) + 0}:${minutos + 14}`
console.log(horaPublicacion)
console.log(hoy) */
/* import FB from 'fb'
import fs from 'fs'
(await import('dotenv')).config({ path: ".env" }) */
/* console.log(new Date("2022-06-28T17:43:45-05:00"))
console.log(`${hoy}T${horaPublicacion}:00-05:00`) */
/* FB.api(`/104330924671939/feed`,
    'POST',
    {
        //url:"https://radioondapopular.com/wp-content/uploads/2022/06/341681-una-madre-provoco-un-incendio-en-el-cual-murio-su-hija-de-cuatro-anos-en-argentina_381532_1_62bb658d908f8.jpg",
        source: fs.createReadStream("screen/62ba7d34ff79f4e0784b911d.jpg"),
        "message": `"Esto es una prueba"`,
        // "link": `https://radioondapopular.com`,
        "published": "false",
        //"scheduled_publish_time": `${hoy}T${horaPublicacion}:00-05:00`,
        "scheduled_publish_time": "2022-06-28T18:05:45-05:00",
        //"scheduled_publish_time": `${fecha}T${hora}-05:00`,
        'access_token': `${process.env.TOKEN_FACEBOOK}`
    },
    function (response) {
        if (response.error) {
            console.log("Error")
            console.log(response)
        } else {
            console.log(response)
        }
    }
) */

/* import Model from './models/posterModel.js' */

/* const data = await Model.findOne({title:"1PERÚ LIBRE NO PRESENTARÁ EN CAJAMARCA CANDIDATURA REGIONAL"})
console.log(data)
if(data) {
    console.log("Es Correcto")
} */

/* const info = await Model.findOne({ link: `https://radioondapopular.com/cajamarca/peru-libre-no-presentara-en-cajamarca-candidatura-regional/` })
console.log(info) */

/* import { chromium } from "playwright";

async function abrirPagina(){
    const browser = await chromium.launch({ignoreDefaultArgs:['--mute-audio'],headless:false})
    const page = await browser.newPage()
    try{
        await page.goto("https://kalsdflkk.com")
    }catch(err){
        console.log("The browser Close")
        await browser.close()
    }   

}
abrirPagina() */
/* 
import Model from './models/posterModel.js'

const data = await Model.findOne({_id:"62c12e6137bcd441fa50cb7e"})
const {estado_screen} = data
console.log(estado_screen)
 */
import FB from 'fb'
import dotenv from 'dotenv'

dotenv.config({path:".env"})
FB.api(
    "/630097175263205/comments",
    "POST",
    {
        "message": "https://radioondapopular.com/mundo/ray-dalio-arremete-contra-los-populistas-de-ee-uu-y-advierte-que-occidente-pagara-un-gran-precio-por-el-conflicto-en-ucrania/",
        "access_token": `${process.env.TOKEN_FACEBOOK}`
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
        console.log(response)
      }else{
        console.log(response)
      }
    }
);
