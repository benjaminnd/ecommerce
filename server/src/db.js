import mongoose from 'mongoose';

const WithDb = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected: ${connect.connection.host}`)
    
        } catch (error) {
            console.error(`Error: ${error}`)
            process.exit(1)
        }
}
  
export default WithDb;