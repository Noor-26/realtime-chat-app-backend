const express = require('express')
const cors = require('cors');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000

const { MongoClient, ServerApiVersion } = require('mongodb');
const { Cursor } = require('mongoose');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.296sc.mongodb.net/?retryWrites=true&w=majorit`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => { 
    try{
        await client.connect()
        const chatCollection = client.db("Chat-app").collection("chats");   
        
        app.get('/chats',async (req,res) => {
            const chats = await chatCollection.find().toArray()
            res.send(chats);
        })
        app.get('/chats/:id ',async (req,res) => {
            const id = req.params.id
            const cursor = {_id:id}
            const chats = await chatCollection.findOne(cursor)
            res.send(chats);
        })
        app.put('/users/:email',async(req,res)=>{
            const email = req.params.email
            const user = req.body
            const filter = {email:email}
            const options = {upsert:true}
            const updateDoc={
                $set:user
            }
            const result = await userCollection.updateOne(filter,updateDoc,options)
            const token = jwt.sign({email:email},process.env.ACCESS_TOKEN,{expiresIn:'10h'})
            res.send({result,token});
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