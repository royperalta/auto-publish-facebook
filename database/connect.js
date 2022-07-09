import { mongoose } from 'mongoose';

 const connectBD = async () => {
    try{        
        (await import('dotenv')).config({path:".env"})
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,       
                       
        })       
        
        console.log(`connected ${conn.connection.host}`)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
export default connectBD
