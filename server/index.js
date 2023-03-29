const express = require('express')
const cors = require('cors'); // import the cors package


const connectDb = require('./Config/connectDb')
const authRoute = require('./Routes/authRoute')
const projectRoute = require('./Routes/projectRoute');
const ticketRoute = require('./Routes/ticketRoute')

require('dotenv').config({ path:"./.env"})

const App = express();


Port = 8000;
//Run the serever 
App.listen(Port, ()=>{
  console.log(`Server is running on port ${Port}`)
})
App.use(cors({
  origin: 'http://localhost:3000'
}));
//Connect to the Database
connectDb()
//Middleware globale
App.use(express.json())

// Routes middleware
App.use('/auth',authRoute)
App.use('/projects', projectRoute);
App.use('/tickets', ticketRoute);

