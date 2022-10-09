require("dotenv").config()
const express = require("express")
const connectDb = require("./config/config")
const locationRouter = require("./src/router/locationRoute")

const app = express()

app.use(express.json())

connectDb()

app.use("/api/v1",locationRouter)

app.listen(5000,()=>{
    console.log(`port is listening on port 5000`)
})

