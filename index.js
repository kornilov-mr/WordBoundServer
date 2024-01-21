require("dotenv").config()
// env variable
const PORT = process.env.PORT || 7000
//main imports
const express =require("express")
const cors = require('cors')
const path = require('path')
const mongoose = require("mongoose");
const router =require("./routers/index")
const errorHandler = require("./middlewares/ErrorHandlerMiddleware")


const app = express()
app.use(cors())
app.use(express.json())
app.use("/api",router)
app.use(errorHandler)

//middlewares

const start = async () =>{
    try {
        app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
    } catch (e) {
        throw e
    }
}
start()