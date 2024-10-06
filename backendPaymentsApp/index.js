const express = require('express')
const app = express();

//main router
const mainRouter = require('./routes/index')



//add cors
const cors = require('cors')
let corsOptions = {
    options : ["http://localhost:5173"]
}

app.use(cors(corsOptions))


//parse body in POST request
app.use(express.json())



app.use('/api/v1', mainRouter)



app.get("/", (req, res) => {
    res.send("Hello World!!")
})

app.listen(PORT, () => {
    console.log(`App is listening on PORT : ${PORT}`)
})