require("./db/conn")
const express = require('express');
const app = express()
const cors = require("cors")
const port = 1800;


app.use(cors())
// ROUTES 
const authroute = require("./routes/Authrout")
app.use(authroute)
const noteroute = require("./routes/Notesrout")
app.use(noteroute)
app.listen(port, () => {
    console.log(`server is running on  port ${port}`);
})