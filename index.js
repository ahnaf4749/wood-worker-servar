const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z9zwita.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const seviceCullection = client.db('woodWorker').collection('services');
        const reviewCollection = client.db('woodWorker').collection('reviews')

        app.get('/limitservices', async (req, res) => {
            const query = {}
            const cursor = seviceCullection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = seviceCullection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await seviceCullection.findOne(query);
            res.send(service);
        })

        // review details




        app.get('/myreviews', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            };
            const cursor = reviewCollection.find(query)
            const orders = await cursor.toArray();
            res.send(orders)
        })

        app.get('/serviceReviews', async (req, res) => {
            let query = {}
            if (req.query.service) {
                query = {
                    service: req.query.service
                }
            };
            const cursor = reviewCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)
        })

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })


        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query)
            res.send(result);
        })

        app.post('/services', async (req, res) => {
            const review = req.body;
            const result = await seviceCullection.insertOne(review);
            res.send(result);
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