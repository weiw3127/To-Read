import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
app.use(bodyParser.json());

const useDB = async (func, res) => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('to-read');
        await func(db)
        client.close();
    } catch(error){
        return res.status(500).json({message: 'connection failed', error});
    }
}

app.get('/api/articles', async (req, res) => {
    useDB( async (db) => {
        const articles = await db.collection('articles').find({}).toArray();
        res.status(200).json(articles);
    })
});

app.get('/api/article/:Id', async (req, res)=>{
    useDB( async (db) => {
        const articleId = req.params.Id;
        const articleInfo = await db.collection('articles').findOne({Id: +articleId});
        console.log(articleInfo)
        res.status(200).send(articleInfo);
    }, res)
})

app.post('/api/articles', async (req, res)=>{
    useDB( async(db) => {
        await db.collection('articles').insert(req.body);
    }, res)
})

app.post('/api/delete/articles/:Id', async(req,res) => {
    useDB( async(db) =>{
        const articleId = req.params.Id;
        await db.collection('articles').deleteOne({ Id: +articleId });
        const cursor = db.collection('articles').find({});
        const articles = await cursor.toArray();
        res.status(200).send(articles);
    }, res)
})
app.listen(8000, ()=>console.log('Listening to port 8000'))
