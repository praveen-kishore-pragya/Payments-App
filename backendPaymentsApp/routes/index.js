const express = require('express')
const router = express.Router()

//user Router
const userRouter = require('./user')
app.use('/user', userRouter)



module.exports = {
    router
}