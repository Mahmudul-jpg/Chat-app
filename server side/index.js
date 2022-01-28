const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
// app.get('/', (req, res) => { res.send('api created') });
app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 4000
app.listen(4000, console.log(`server started ${PORT}`))