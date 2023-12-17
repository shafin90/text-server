const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://mashrafiahnam:IOwrG4DoOlIGCD3G@cluster0.yhuz2xd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const userCollection = client.db("Text").collection('userInfo');
    const messages = client.db("Text").collection('messages');

    // User information==================================================================================================

    //  Getting all user's data
    app.get('/userInfo', async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    // Posting user' data
    app.post('/users', async (req, res) => {
      const { email, name, img, password, number } = req.body;
      const result = await userCollection.insertOne({ email, name, img, password, number });
      res.send(result);
    });

    // Puting user' data
    app.post('/users', async (req, res) => {
      const { email, name, img, password, number } = req.body;
      const result = await userCollection.insertOne({ email, name, img, password, number });
      res.send(result);
    });

    // Messaging section======================================================================================

    // Posting messages
    app.post('/messages', async (req, res) => {
      const { from, to, message } = req.body;
      const result = await messages.insertOne({ from, to, message });
      res.send(result);
    });

    app.get('/allMessages', async (req, res) => {
      const cursor = messages.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);

app.get('/hi', (req, res) => {
  res.send('shafin,,,your server is running...')
})

app.listen(port, () => {
  console.log(`${port}`)
})


