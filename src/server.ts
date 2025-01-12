import createApp from './app';
import dotenv from 'dotenv';
dotenv.config();

const port:Number = process.env.PORT? Number(process.env.PORT) : 5005;
const app = createApp();

app.listen(port,()=>{
    console.clear();
    console.log(`Rest API server ready at http://localhost:${port}`);
});