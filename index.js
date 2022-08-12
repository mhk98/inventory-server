const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fvmrh.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.srag4n2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
      console.log('dbconnected')

      
      const subnavCollection= client.db('inventory_management').collection('subnav')
      const subcatCollection= client.db('inventory_management').collection('subcat')
      const inventoryCollection= client.db('inventory_management').collection('inventory')
      const processorCollection= client.db('inventory_management').collection('processor')
      const keyboardCollection= client.db('inventory_management').collection('keyboard')
      const televisionCollection= client.db('inventory_management').collection('television')
      const refrigeratorCollection= client.db('inventory_management').collection('refrigerator')
      

        

        app.get('/inventory', async(req, res)=>{
            const query= {}
            const cursor = inventoryCollection.find(query);
            const result= await cursor.toArray();
            res.send(result)
        })

        app.get('/subcat', async(req, res)=>{
            const query= {}
            const cursor = subcatCollection.find(query);
            const result= await cursor.toArray();
            res.send(result)
        })
        app.get('/processor', async(req, res)=>{
            const query= {}
            const cursor = processorCollection.find(query);
            const result= await cursor.toArray();
            res.send(result)
        })
        app.get('/keyboard', async(req, res)=>{
            const query= {}
            const cursor = keyboardCollection.find(query);
            const result= await cursor.toArray();
            res.send(result)
        })
        app.get('/television', async(req, res)=>{
            const query= {}
            const cursor = televisionCollection.find(query);
            const result= await cursor.toArray();
            res.send(result)
        })
        app.get('/refrigerator', async(req, res)=>{
            const query= {}
            const cursor = refrigeratorCollection.find(query);
            const result= await cursor.toArray();
            res.send(result)
        })
        
        
        app.post('/inventory', async(req, res)=>{
          const category = req.body;
          const result = await inventoryCollection.insertOne(category);
          res.send(result)
        })
        app.post('/subcat', async(req, res)=>{
          const category = req.body;
          const result = await subcatCollection.insertOne(category);
          res.send(result)
        })


        app.post('/processor', async(req, res)=>{
            const product = req.body;
            const result = await processorCollection.insertOne(product);
            res.send(result)
          })
        app.post('/keyboard', async(req, res)=>{
            const product = req.body;
            const result = await keyboardCollection.insertOne(product);
            res.send(result)
          })
        app.post('/television', async(req, res)=>{
            const product = req.body;
            const result = await televisionCollection.insertOne(product);
            res.send(result)
          })
        app.post('/refrigerator', async(req, res)=>{
            const product = req.body;
            const result = await refrigeratorCollection.insertOne(product);
            res.send(result)
          })


       


    } finally {

    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})