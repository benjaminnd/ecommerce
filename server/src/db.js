import mongoose from 'mongoose';

const WithDb = async() => {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${connect.connection.host}`)

}

export default WithDb;