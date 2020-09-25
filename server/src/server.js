import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import UserRouter from '../routes/auth.route.js';
import WithDb from '../db.js'



const app = express();

//import env
dotenv.config({
    path:'./.env' 
})

//MongoDb connection

WithDb()

//
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json());

app.use('/api/user/', UserRouter)
//testing routes
app.get('/', (req,res) => {
    res.send('test route => home page');
});

//Page not found
app.use((req, res)=>{
    console.log(process.env.PORT)
    res.status(404).json({
        message: 'Page not found'
    })
})

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})