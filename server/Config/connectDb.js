const mongoose = require('mongoose')
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to the Database.")
  } catch {
    console.log("Failed to connect to the Database.")
  }
}
module.exports = connect