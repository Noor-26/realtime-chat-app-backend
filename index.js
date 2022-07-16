const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000

app.get('/', async (req,res) => {
    res.send('server is runing')
})
app.listen(port,() => {
    console.log('Connections to the port done'); 
})