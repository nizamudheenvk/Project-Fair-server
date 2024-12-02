// Loads .env file contents into  porcess.env by default

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routs/router')
require('./config/connection')


const pfServer = express()


pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)

PORT = 3000 || process.env.PORT
pfServer.listen(PORT,()=>{
    console.log(`Project Fair Server started at port : ${PORT} and waiting for client request!!!`);
    
})
// controller
 
pfServer.get('/',(req,res)=>{
    res.status(200).send(` <h1 style ="color:red">Project Fair Server started and waiting for client request </h1>`)
})
