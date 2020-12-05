import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import UserRouter from './routes/auth.route.js';
import CategoryRouter from './routes/category.route.js';
import WithDb from './db'
import ProductRouter from './routes/product.route.js';
import regeneratorRuntime from "regenerator-runtime"


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
app.use('/api/category/', CategoryRouter)
app.use('/api/product/', ProductRouter)
app.use("/uploads", express.static("uploads"))
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})
