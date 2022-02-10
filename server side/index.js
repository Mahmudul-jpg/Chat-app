const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const { notFound, errorHandler } = require('./middleware/error')
const messageRoutes = require('./routes/messageRoutes')
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.get('/', (req, res) => { res.send('api created') });
app.use("/api/user", userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(4000, console.log(`server started ${PORT}`))