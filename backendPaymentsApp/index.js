const express = require('express')
const app = express();


//add cors
const cors = require('cors')
let corsOptions = {
    options : ["http://localhost:5173"]
}

app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.send("Hello World!!")
})

app.listen(PORT, () => {
    console.log(`App is listening on PORT : ${PORT}`)
})