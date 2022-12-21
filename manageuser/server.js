const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

app.use(cors())
app.use("/manage", require("./api"))

app.listen(3000, function () {
  console.log("Server is running on port 3000")
})