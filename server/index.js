// import packages
const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config()

// import files 
const { check_db_connection } = require("./database")
const router = require("./routes")
const json_error_handler = require("./middleware/json_error_handler")
const cookieParser = require('cookie-parser')


// enviroment variables 
const PORT = process.env?.PORT ?? 5000
const HOST = process.env?.HOST ?? "0.0.0.0"

// allow cros
app.use(cors())

// parse cookie
app.use(cookieParser())

// allow json
app.use(express.json({limit: "1mb"}),json_error_handler);

// all router 
app.use("/", router)

// testing routing 
app.get("/", (req, res) => {
    res.send("Hello,World!")
})

// express app listen
app.listen(
    PORT,
    HOST,
    (err) => {
        if (err) {
            console.log(err)
        }
        else {
            // check db connection 
            check_db_connection()
            console.log(`Server running on http://127.0.0.1:${PORT}`)
        }
    }
)