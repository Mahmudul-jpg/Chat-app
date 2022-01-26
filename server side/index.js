const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config
app.get('/', (req, res) => { res.send('api created') });
const PORT = process.env.PORT || 4000
app.listen(4000, console.log(`server started ${PORT}`))