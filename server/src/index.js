import express from 'express'

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello Express')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})