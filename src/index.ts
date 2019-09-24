import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    return res.send("Hello world!");
});

app.listen(8080, () => {
    console.log('App is now running');
});