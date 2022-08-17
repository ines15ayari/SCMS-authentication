const express = require('express')
const App = express()
const connectDb = require('./Config/connectDb')
const authRoute = require('./Routes/authRoute')
require('dotenv').config({ path:"./.env"})

Port = 8000;
//Run the serever 
App.listen(Port, ()=>{
  console.log(`Server is running on port ${Port}`)
})
//Connect to the Database
connectDb()
//Middleware globale
App.use(express.json())
App.use('/auth',authRoute)