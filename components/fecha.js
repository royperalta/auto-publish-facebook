import moment from 'moment'

function fecha(cantidad) {
   try{
    let fecha = moment().format()
    let nuevaFecha = new Date(fecha);
    let horaP = nuevaFecha.setHours(nuevaFecha.getHours() - 5)
    let h = new Date(horaP)   
    let horaPeruSecond = h.setMinutes(h.getMinutes() + cantidad);
   // console.log(horaPeruSecond)
    let horaPeru = new Date(horaPeruSecond)
    return horaPeru
   }catch(e){console.log(e)}
}
export default fecha