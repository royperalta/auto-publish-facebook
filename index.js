import express from 'express';
import dotenv from 'dotenv';
import routes from './components/routers.js'
import cors from 'cors'
import fetch from 'node-fetch'
import Model from  './models/posterModel.js'
//import db from './database/connect.js'
dotenv.config({path:'.env'})
const app = express();

app.use(cors())
app.use('/api',routes)
app.use('/images',express.static('images'))
app.use('/screen',express.static('screen'))


const PORT = process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`Funcionando en ${PORT}`)
})


setInterval(async () => {    
   await fetch("http://127.0.0.1:5000/api/save")   
}, 10000);