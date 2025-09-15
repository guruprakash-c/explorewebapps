import express from 'express';
import commonRouter from './routes/index.mjs';

const app = express();
app.use(express.json());
app.use(commonRouter);



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Running on Port: ${PORT}`);
})