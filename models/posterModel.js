import mongoose from 'mongoose';
import db from '../database/connect.js'
db()
const posterSchema = new mongoose.Schema({
    title: String,
    content: String,
    featured_media: String,
    register_date: {
        type: Date
    },
    estado: String,
    estado_screen:String,
    estado_descarga_imagen:String,
    fecha_publicacion: String,
    estado_facebook:String,
    source_url: String,
    link:String
})
const UserModel = mongoose.model('tables', posterSchema)

export default UserModel




