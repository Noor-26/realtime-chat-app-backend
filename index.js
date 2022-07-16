const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Noor-26:noor123228@cluster0.296sc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => { 
    try{
        await client.connect()
        const chatCollection = client.db("Chat-app").collection("chats");   
        
        app.get('/chats',async (req,res) => {
            const chats = await chatCollection.find().toArray()
            res.send(chats);
        })
    }

    finally{}
}
run()
app.get('/', async (req,res) => {
    res.send('server is runing')
})
app.listen(port,() => {
    console.log('Connections to the port done'); 
})