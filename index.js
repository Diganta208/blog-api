const express = require('express')
const mongoose= require('mongoose')
const blog= require('./Routes/blog')
const app = express()

app.use(express.json())
app.use('/blog',blog)

const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})

mongoose.connect('mongodb://localhost:27017/BlogDB')
    .then(()=>{ console.log("Connected with mongodb")})  
     .catch((err)=>{console.log(err)})