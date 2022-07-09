import fetch from 'node-fetch'
const URL = "https://radioondapopular.com/wp-json/jwt-auth/v1/token"
import dotenv from 'dotenv'
dotenv.config({path:".env"})
const token = async () => {
   try{
    let data = {
        "username":process.env.USER,
        "password":process.env.PASSWORD
     }
    const response = await fetch(URL,{
        method: 'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
       
    })   
    const json = await response.json()
    return json.token
   }catch(e) {
    console.log(e)
   }
}
 export default token