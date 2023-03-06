const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/user')
const adminRoute = require('./routes/admin')
const cors = require('cors')
const jwt = require('jsonwebtoken')


app.use(express.json())
app.use(cors())

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log('Database is connected'))

app.use('/',userRouter)
app.use('/admin',adminRoute)
app.use('/api/images',express.static('./public/images'))

app.listen(process.env.PORT||4000,()=>console.log("server is connected"))