const express = require("express")
const app = express()
require('dotenv').config()

const PORT = process.env?.PORT ?? 5000
const HOST = process.env?.HOST ?? "0.0.0.0"
app.get("*", (req, res) => {
    res.send("Hello,World!")
})

app.listen(PORT, HOST, (err) => err ? console.log(err) : console.log(`Server running on http://127.0.0.1:${PORT}`))