const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z9zwita.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const seviceCullection = client.db('woodWorker').collection('services');

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = seviceCullection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })
    }
    finally {

    }
}
run().catch(error => console.error(error))


app.get('/', (req, res) => {
    res.send('wood work servar is running')
})

app.listen(port, () => {
    console.log(`wood work servar runing on ${port}`);
})