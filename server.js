import express from 'express';
import router from './routes/index';
import cors from 'cors';

const PORT = 3000;
const HOST = 'localhost';
const app = express();
app.use(cors({ allowedHeaders: 'X-Token'}));
app.use(express.json())
app.use('/', router);

app.listen(PORT, ()=> {
    console.log(`SERVER is running on PORT ${PORT}`);
});
