const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV 
mongoose = require('mongoose')
//port = 27017
//dbName = e-commerce
if(NODE_ENV){

    var connection =  'mongodb://localhost:27017/e-commerce_'+NODE_ENV
}else{
    var connection = process.env.CONNECTION
}
mongoose.connect(`${connection}`, {useNewUrlParser: true})
.catch((err)=>{
    console.log(err)
})

const index=require('./routers/index.js')
const cors= require('cors')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', index)
const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)

app.listen(port, ()=>console.log(`listening to port :${port}`))

module.exports = app